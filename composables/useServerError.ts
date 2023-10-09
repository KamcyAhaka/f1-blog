import { AuthError } from 'firebase/auth';

export default () => {
  const throwError = (authError: AuthError) => {
    switch (authError.code) {
      case 'auth/user-not-found':
        throw createError({
          statusMessage: 'User does not exist.',
        });

      case 'auth/wrong-password':
        throw createError({
          statusMessage: 'Invalid email or password.',
        });

      case 'auth/network-request-failed':
        throw createError({
          statusMessage: 'Please check your internet connection and try again.',
        });

      case 'auth/internal-error':
        throw createError({
          statusMessage: 'Internal server error, please try again later.',
        });

      case 'auth/email-already-in-use':
        throw createError({
          statusMessage: 'This email is already in use.',
        });

      default:
        throw createError({
          statusMessage: authError.message,
        });
    }
  };

  return { throwError };
};
