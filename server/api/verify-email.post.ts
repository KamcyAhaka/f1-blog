import { User, sendEmailVerification } from 'firebase/auth';
import { useUserStore } from '~/stores/user';

export default defineEventHandler(async (event) => {
  const userStore = useUserStore();
  const user = userStore.user as User;
  await sendEmailVerification(user, {
    url: 'https://f1-blog.netlify.app/admin/verified',
  });
});
