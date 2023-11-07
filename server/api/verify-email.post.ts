import {
  AuthError,
  applyActionCode,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import useServerError from '~/composables/useServerError';
import { auth } from '~/firebase';

export default defineEventHandler(async (event) => {
  const { oobCode, lang } = getQuery<{ oobCode: string; lang: string }>(event);

  const { email, password } = await readBody<{
    email: string;
    password: string;
  }>(event);

  const { throwError } = useServerError();

  try {
    await applyActionCode(auth, String(oobCode));

    const credentials = await signInWithEmailAndPassword(auth, email, password);

    console.log('Email verified');

    return {
      verifiedUser: credentials.user,
      // email: email.value,
      // password: password.value,
    };
  } catch (error) {
    let authError = error as AuthError;

    throwError(authError);
  }
});
