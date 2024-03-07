import { useUserStore } from '~/stores/user';

export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore();

  if (userStore.user === null) {
    return navigateTo(
      `/auth/signin?redirect=${encodeURIComponent(from?.path)}`
    );
  }
});
