import { useUserStore } from '~/stores/user';

export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore();
  const user = userStore.user;

  if (user && !user.emailVerified) {
    return navigateTo('/admin/verify-email');
  }
});
