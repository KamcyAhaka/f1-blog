import {
  createUserWithEmailAndPassword,
  type AuthError,
  signInWithEmailAndPassword,
  signOut,
  type User,
  sendEmailVerification,
  updateProfile,
  applyActionCode,
  reauthenticateWithCredential,
  type AuthCredential,
  reload,
} from 'firebase/auth';
import { auth } from '~/firebase';
import getRandomHexColor from '~/utils/getRandomColours';

type AuthReturnType =
  | { type: 'success'; user: User | null }
  | { type: 'error'; error: AuthError };

type VerificationReturnType =
  | { type: 'success'; result: true }
  | { type: 'error'; error: AuthError };

type TokenReturnType =
  | { type: 'success'; token: string }
  | { type: 'redirect'; url: string }
  | { type: 'error'; error: AuthError };

export default function () {
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

      const photoURL = `https://api.dicebear.com/7.x/initials/svg?seed=${username}&backgroundColor=${getRandomHexColor()}`;

      await updateProfile(credentials.user, {
        displayName: username,
        photoURL,
      });

      return { type: 'success', user: credentials.user };
    } catch (error) {
      let authError = error as AuthError;
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
  ): Promise<VerificationReturnType> {
    try {
      await applyActionCode(auth, oobCode);

      return { type: 'success', result: true };
    } catch (error) {
      let authError = error as AuthError;
      return { type: 'error', error: authError };
    }
  }

  async function useTokenRetrieval(): Promise<TokenReturnType> {
    try {
      if (!auth.currentUser) {
        return { type: 'redirect', url: '/auth/signin' };
      }
      const token = await auth.currentUser.getIdToken();
      return { type: 'success', token };
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
    useTokenRetrieval,
  };
}
