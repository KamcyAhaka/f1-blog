import { User, sendEmailVerification } from 'firebase/auth';
import { useUserStore } from '~/stores/user';

export default defineEventHandler(async (event) => {
  const userStore = useUserStore();
  const user = userStore.user as User;
  await sendEmailVerification(user, {
    url: 'http://localhost:3000/admin/verified',
  });
});
