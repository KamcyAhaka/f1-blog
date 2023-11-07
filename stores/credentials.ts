import { defineStore } from 'pinia';

export const useCredentialStore = defineStore(
  'credentialStore',
  () => {
    const credentials: Ref<{ email: string; password: string }> = ref({
      email: '',
      password: '',
    });

    const updateCredentials = (
      updatedEmail: string,
      updatedPassword: string
    ) => {
      credentials.value.email = updatedEmail;
      credentials.value.password = updatedPassword;
    };

    return { credentials, updateCredentials };
  },
  {
    persist: true,
  }
);
