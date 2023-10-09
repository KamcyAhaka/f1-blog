import {
  AuthError,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import { useFetch } from 'nuxt/app';
import useServerError from '~/composables/useServerError';
import { auth } from '~/firebase/index';

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody<{
    email: string;
    password: string;
  }>(event);
  const { throwError } = useServerError();

  try {
    const credentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    if (credentials) {
      await sendEmailVerification(credentials.user);
    }
  } catch (error) {
    let authError = error as AuthError;
    throwError(authError);
  }
});
