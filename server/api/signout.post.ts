import { AuthError, signOut } from 'firebase/auth';
import useServerError from '~/composables/useServerError';
import { auth } from '~/firebase';

export default defineEventHandler(async (event) => {
  const { throwError } = useServerError();

  try {
    await signOut(auth);
  } catch (error) {
    let authError = error as AuthError;
    throwError(authError);
  }
});
