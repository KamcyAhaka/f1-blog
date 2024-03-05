import { AuthError, User, applyActionCode } from 'firebase/auth';
import useServerError from '~/composables/useServerError';
import { auth } from '~/firebase';

export default defineEventHandler(async (event) => {
  const { oobCode } = getQuery<{ oobCode: string; lang: string }>(event);

  const { throwAuthError } = useServerError();

  try {
    await applyActionCode(auth, oobCode);

    const user = await event.context.getUser();

    return user;
  } catch (error) {
    let authError = error as AuthError;

    throwAuthError(authError);
  }
});
