import { useUserStore } from '~/stores/user';

export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore();
  const user = userStore.user;

  if (user && user.providerData[0].displayName === null) {
    return navigateTo('/admin/edit-profile');
  }
});
