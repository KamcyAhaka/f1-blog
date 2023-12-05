import {
  AuthError,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { FirestoreError, doc, setDoc, updateDoc } from 'firebase/firestore';
import ImageKit from 'imagekit';

import useServerError from '~/composables/useServerError';
import { auth, db } from '~/firebase';
import CredentialsType from '~/types/CredentialsType';

export default defineEventHandler(async (event) => {
  let imagekit = new ImageKit({
    urlEndpoint: 'https://ik.imagekit.io/chyktg5pia/f1-blog',
    privateKey: 'private_xwXlbClfYahG3Me0vk+Ta294Ei0=',
    publicKey: 'public_ZFxGy6YNSZm5h3DCg6499eSQ/zs=',
  });

  const { username, mobileNumber, gender, nationality, photoInfo } =
    await readBody<{
      username: string;
      mobileNumber: string;
      gender: string;
      nationality: string;
      photoInfo: {
        photoBinary: string;
        photoType: string;
      };
    }>(event);

  const uploadImage = await imagekit.upload({
    file: photoInfo.photoBinary,
    fileName:
      photoInfo.photoType === 'image/webp'
        ? `${username}.webp`
        : photoInfo.photoType === 'image/png'
        ? `${username}.png`
        : `${username}.jpg`,
  });

  let photoUrl = '';

  const credentialsCookie = getCookie(event, 'credentials');

  const parsedCredentials: CredentialsType = JSON.parse(
    credentialsCookie as string
  );

  const { throwAuthError, throwDbError } = useServerError();

  try {
    if (auth.currentUser) {
      const uploadImage = await imagekit.upload({
        file: photoInfo.photoBinary,
        fileName:
          photoInfo.photoType === 'image/webp'
            ? `${username}.webp`
            : photoInfo.photoType === 'image/png'
            ? `${username}.png`
            : `${username}.jpg`,
      });

      await updateDoc(doc(db, 'admin', auth.currentUser.uid), {
        username,
        mobileNumber,
        gender,
        nationality,
      });

      await updateProfile(auth.currentUser && auth.currentUser, {
        displayName: username,
        photoURL: uploadImage.url,
      });

      if (uploadImage) {
        const credentials = await signInWithEmailAndPassword(
          auth,
          parsedCredentials.email,
          parsedCredentials.password
        );

        return { user: credentials.user };
      }
    } else {
      throwAuthError(new Error('No signed in user') as AuthError);
    }
  } catch (error) {
    let dbError = error as FirestoreError;
    throwDbError(dbError);
  }
});
