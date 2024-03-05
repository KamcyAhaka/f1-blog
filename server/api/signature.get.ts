import ImageKit from 'imagekit';

export default defineEventHandler(async (event) => {
  const imagekit = new ImageKit({
    urlEndpoint: 'https://ik.imagekit.io/chyktg5pia/f1-blog',
    privateKey: 'private_nPUR3hsNeBq2WDXA3LuQ8Zm8hTw=',
    publicKey: 'public_qzVYQ7/ZYx7q5SPAXQuGBI5I7j4=',
  });

  const authenticationParams = imagekit.getAuthenticationParameters();

  return authenticationParams;
});
