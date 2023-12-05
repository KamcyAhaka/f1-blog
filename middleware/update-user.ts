import { useUserStore } from '~/stores/user';

export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore();
  const user = userStore.user;

  if (
    (user && user.displayName === null) ||
    (user && user.displayName === 'User')
  ) {
    return navigateTo('/admin/edit-profile');
  }
});
