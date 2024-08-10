import { getAuth } from 'firebase-admin/auth';

export default defineEventHandler(async (event) => {
  if (!event.path.startsWith('/api/')) {
    return;
  }

  const idToken = event.node.req.headers.authorization?.split('Bearer ')[1];

  if (!idToken) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Forbidden',
    });
  }

  try {
    const decodedToken = await getAuth().verifyIdToken(idToken);
    event.context.decodedToken = decodedToken;
  } catch (error) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Forbidden',
    });
  }
});
