import { AuthError, signInWithEmailAndPassword } from 'firebase/auth';
import useServerError from '~/composables/useServerError';
import { auth } from '~/firebase/index';

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody<{
    email: string;
    password: string;
  }>(event);
  const { throwError } = useServerError();

  try {
    const credentials = await signInWithEmailAndPassword(auth, email, password);

    if (credentials) {
      return credentials;
    }
  } catch (error) {
    let authError = error as AuthError;
    throwError(authError);
  }
});
