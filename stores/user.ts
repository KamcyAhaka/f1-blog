import { defineStore } from 'pinia';
import type { User } from 'firebase/auth';
import { auth } from '~/firebase';

export const useUserStore = defineStore(
  'userStore',
  () => {
    const user: Ref<null | User> = ref(null);

    const setCurrentUser = () => {
      user.value = auth.currentUser && auth.currentUser;
    };

    return { user, setCurrentUser };
  },
  { persist: true }
);
