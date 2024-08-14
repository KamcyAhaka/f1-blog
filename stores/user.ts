import { defineStore } from 'pinia';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from '~/firebase';

export const useUserStore = defineStore(
  'userStore',
  () => {
    const user: Ref<null | User> = ref(null);

    async function watchUser() {
      onAuthStateChanged(auth, (changedUser) => {
        user.value = changedUser;
      });
    }

    return { user, watchUser };
  },
  { persist: true }
);
