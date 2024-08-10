import { initializeApp } from 'firebase-admin/app';
import { cert } from 'firebase-admin/app';
import * as serviceAccount from '~/f1-blog-service-account-key.json';

export default defineNitroPlugin((nitroApp) => {
  const app = initializeApp({
    // @ts-ignore
    credential: cert(serviceAccount),
    databaseURL: 'https://f1-blog-8d4cc-default-rtdb.firebaseio.com',
  });

  nitroApp.hooks.hook('request', (event) => {
    event.context.firebaseAdmin = { app };
  });
});
