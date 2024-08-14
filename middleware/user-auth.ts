import { useUserStore } from '~/stores/user';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const userStore = useUserStore();

  if (userStore.user === null) {
    return await navigateTo(
      `/auth/signin?redirect=${encodeURIComponent(from?.path)}`
    );
  }

  if (to.path.startsWith('/auth/')) {
    return navigateTo('/admin/');
  }
});
