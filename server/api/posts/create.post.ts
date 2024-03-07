import { auth } from '~/firebase/index';
import { collection, serverTimestamp, addDoc } from 'firebase/firestore';
import { db } from '~/firebase/index';
import useServerError from '~/composables/useServerError.js';
import { AuthError } from 'firebase/auth';

export default defineEventHandler(async (event) => {
  const { postTitle, postContent, authorID } = await readBody<{
    postTitle: string;
    postContent: string;
    authorID: string;
  }>(event);

  const { throwAuthError } = useServerError();

  try {
    if (auth.currentUser) {
      const postRef = await addDoc(collection(db, 'posts'), {
        postTitle,
        postContent,
        authorID,
        createdAt: serverTimestamp(),
      });

      if (postRef) {
        setResponseStatus(event, 201, 'Post created');
      }
    }
  } catch (error) {
    let authError = error as AuthError;
    throwAuthError(authError);
  }
});
