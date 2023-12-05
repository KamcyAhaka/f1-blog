import {
  AuthError,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { useFetch } from 'nuxt/app';
import useServerError from '~/composables/useServerError';
import { auth, db } from '~/firebase/index';

export default defineEventHandler(async (event) => {
  const { username, email, password } = await readBody<{
    username: string;
    email: string;
    password: string;
  }>(event);
  const { throwAuthError } = useServerError();

  try {
    const credentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    if (credentials) {
      await sendEmailVerification(credentials.user);

      await setDoc(
        doc(db, 'admin', credentials.user.uid),
        {
          username: credentials.user.displayName
            ? credentials.user.displayName
            : 'User',
        },
        { merge: true }
      );

      await updateProfile(credentials.user, {
        displayName: username,
      });

      const credentialsCookie = setCookie(
        event,
        'credentials',
        JSON.stringify({ email, password }),
        {
          maxAge: 365 * 24 * 24,
          httpOnly: true,
        }
      );

      return credentials;
    }
  } catch (error) {
    let authError = error as AuthError;
    throwAuthError(authError);
  }
});
