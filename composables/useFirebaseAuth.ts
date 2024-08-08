import {
  createUserWithEmailAndPassword,
  type AuthError,
  signInWithEmailAndPassword,
  signOut,
  type User,
  sendEmailVerification,
  updateProfile,
  applyActionCode,
} from 'firebase/auth';
import { auth } from '~/firebase';

type AuthReturnType =
  | { type: 'success'; user: User | null }
  | { type: 'error'; error: AuthError };

export default function () {
  const { throwAuthError } = useFirebaseError();

  async function useSignUp(
    email: string,
    password: string,
    username: string
  ): Promise<AuthReturnType> {
    try {
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await sendEmailVerification(credentials.user);

      await updateProfile(credentials.user, {
        displayName: username,
      });

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
  async function useSignOut(): Promise<AuthReturnType> {
    try {
      await signOut(auth);
      return { type: 'success', user: null };
    } catch (error) {
      let authError = error as AuthError;
      return { type: 'error', error: authError };
    }
  }

  async function useEmailVerification(
    oobCode: string
  ): Promise<AuthReturnType> {
    try {
      await applyActionCode(auth, oobCode);
      return { type: 'success', user: auth.currentUser };
    } catch (error) {
      let authError = error as AuthError;
      return { type: 'error', error: authError };
    }
  }

  return {
    useSignUp,
    useSignIn,
    useSignOut,
    useEmailVerification,
  };
}
