declare module 'h3' {
  interface EventContext {
    getUser?: Promise<UserCredential>;
  }
}

export {};

import { UserCredential, signInWithEmailAndPassword } from 'firebase/auth';
import useServerError from '~/composables/useServerError.js';
import { auth } from '~/firebase/index.js';

export default defineEventHandler(async (event) => {
  const { throwAuthError } = useServerError();

  if (
    event.path.startsWith('/api/signup') ||
    event.path.startsWith('/api/signin')
  )
    return;

  const credentialsCookie = getCookie(event, 'credentials');

  if (credentialsCookie) {
    const parsedCredentials = JSON.parse(credentialsCookie as string);

    const getUser = async () => {
      const credentials = await signInWithEmailAndPassword(
        auth,
        parsedCredentials.email,
        parsedCredentials.password
      );

      return credentials;
    };
    event.context.getUser = getUser;
  } else return;
});
