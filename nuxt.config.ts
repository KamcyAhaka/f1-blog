// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    'nuxt-swiper',
    // 'nuxt-vuefire',
    // '@nuxtjs/eslint-module',
  ],
  /*vuefire: {
    auth: {
      enabled: true,
    },
    config: {
      apiKey: 'AIzaSyCtd0yH1L5nmB7wRJPhHCDbyUW_O-4i7J0',
      authDomain: 'f1-blog-8d4cc.firebaseapp.com',
      databaseURL: 'https://f1-blog-8d4cc-default-rtdb.firebaseio.com',
      projectId: 'f1-blog-8d4cc',
      storageBucket: 'f1-blog-8d4cc.appspot.com',
      messagingSenderId: '1011215681017',
      appId: '1:1011215681017:web:6439537c3391e53b5ba928',
      measurementId: 'G-FLQGPW9GCS',
    },
  },*/
  css: ['@fortawesome/fontawesome-svg-core/styles.css'],
});
