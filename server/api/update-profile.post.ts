import {
  AuthError,
  User,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { FirestoreError, doc, setDoc } from 'firebase/firestore';
import useServerError from '~/composables/useServerError';
import { auth, db } from '~/firebase';
import { useUserStore } from '~/stores/user';
import CredentialsType from '~/types/CredentialsType';

export default defineEventHandler(async (event) => {
  const { username, mobileNumber, gender, nationality, photoUrl } =
    await readBody<{
      username: string;
      mobileNumber: string;
      gender: string;
      nationality: string;
      photoUrl: string;
    }>(event);

  const credentialsCookie = getCookie(event, 'credentials');

  const parsedCredentials: CredentialsType = JSON.parse(
    credentialsCookie as string
  );

  const { throwAuthError, throwDbError } = useServerError();

  try {
    if (auth.currentUser) {
      await setDoc(doc(db, 'admin', username), {
        uid: auth.currentUser.uid,
        username,
        mobileNumber,
        gender,
        nationality,
        photoUrl,
      });

      await updateProfile(auth.currentUser && auth.currentUser, {
        displayName: username,
      });

      const credentials = await signInWithEmailAndPassword(
        auth,
        parsedCredentials.email,
        parsedCredentials.password
      );

      return { user: credentials.user };
    } else {
      throwAuthError(new Error('No signed in user') as AuthError);
    }
  } catch (error) {
    let dbError = error as FirestoreError;
    throwDbError(dbError);
  }
});
