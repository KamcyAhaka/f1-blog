import { AuthError, updateProfile } from 'firebase/auth';
import { FirestoreError, doc, updateDoc } from 'firebase/firestore';

import useServerError from '~/composables/useServerError';
import { auth, db } from '~/firebase';

import { getRouterParams } from '#imports';

export default defineEventHandler(async (event) => {
  const { username, mobileNumber, gender, nationality, photoURL, dialCode } =
    await readBody<{
      username: string;
      mobileNumber: string;
      gender: string;
      nationality: string;
      photoURL: string;
      dialCode: string;
    }>(event);

  const { throwAuthError, throwDbError } = useServerError();

  try {
    if (auth.currentUser) {
      await updateDoc(doc(db, 'admin', auth.currentUser.uid), {
        username,
        mobileNumber: `${dialCode} ${mobileNumber}`,
        gender,
        nationality,
      });

      await updateProfile(auth.currentUser && auth.currentUser, {
        displayName: username,
        photoURL,
      });

      const user = await event.context.getUser();

      return user;
    } else {
      await sendRedirect(event, '/auth/signin', 302);
    }
  } catch (error) {
    const dbError = error as FirestoreError;
    throwDbError(dbError);
  }
});
