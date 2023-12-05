import ImageKit from 'imagekit';

export default defineEventHandler(async (event) => {
  let imagekit = new ImageKit({
    urlEndpoint: 'https://ik.imagekit.io/chyktg5pia/f1-blog',
    privateKey: 'private_xwXlbClfYahG3Me0vk+Ta294Ei0=',
    publicKey: 'public_ZFxGy6YNSZm5h3DCg6499eSQ/zs=',
  });

  let autheticationParameters = imagekit.getAuthenticationParameters();

  return autheticationParameters;
});
