import { AuthError, signInWithEmailAndPassword } from 'firebase/auth';
import useServerError from '~/composables/useServerError';
import { auth } from '~/firebase/index';

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody<{
    email: string;
    password: string;
  }>(event);
  const { throwAuthError } = useServerError();

  try {
    const credentials = await signInWithEmailAndPassword(auth, email, password);

    if (credentials) {
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
