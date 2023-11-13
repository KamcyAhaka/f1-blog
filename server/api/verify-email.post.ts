import {
  AuthError,
  applyActionCode,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import useServerError from '~/composables/useServerError';
import { auth } from '~/firebase';
import CredentialsType from '~/types/CredentialsType';

export default defineEventHandler(async (event) => {
  const { oobCode, lang } = getQuery<{ oobCode: string; lang: string }>(event);

  const credentialsCookie = getCookie(event, 'credentials');

  const parsedCredentials: CredentialsType = JSON.parse(
    credentialsCookie as string
  );

  const { throwAuthError } = useServerError();

  try {
    await applyActionCode(auth, String(oobCode));

    const credentials = await signInWithEmailAndPassword(
      auth,
      parsedCredentials.email,
      parsedCredentials.password
    );

    return credentials.user;
  } catch (error) {
    let authError = error as AuthError;

    throwAuthError(authError);
  }
});
