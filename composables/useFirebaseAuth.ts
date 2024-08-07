import {
  createUserWithEmailAndPassword,
  type AuthError,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from 'firebase/auth';
import { auth } from '~/firebase';

type AuthReturnType =
  | { type: 'success'; user: User }
  | { type: 'error'; error: AuthError };

export default function () {
  const { throwAuthError } = useFirebaseError();

  async function useSignUp(
    email: string,
    password: string
  ): Promise<AuthReturnType> {
    try {
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      return { type: 'success', user: credentials.user };
    } catch (error) {
      let authError = error as AuthError;
      // throwAuthError(authError);
      return { type: 'error', error: authError };
    }
  }
  async function useSignIn(
    email: string,
    password: string
  ): Promise<AuthReturnType> {
    try {
      const credentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      return { type: 'success', user: credentials.user };
    } catch (error) {
      let authError = error as AuthError;
      return { type: 'error', error: authError };
    }
  }
  async function useSignOut(email: string, password: string) {
    try {
      await signOut(auth);
    } catch (error) {
      let authError = error as AuthError;
      throwAuthError(authError);
    }
  }

  return {
    useSignUp,
    useSignIn,
    useSignOut,
  };
}
