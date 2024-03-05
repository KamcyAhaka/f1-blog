import { AuthError, signOut } from 'firebase/auth';
import useServerError from '~/composables/useServerError';
import { auth } from '~/firebase';

export default defineEventHandler(async (event) => {
  const { throwAuthError } = useServerError();

  try {
    await signOut(auth);
    deleteCookie(event, 'credentials');
  } catch (error) {
    let authError = error as AuthError;
    throwAuthError(authError);
  }
});
