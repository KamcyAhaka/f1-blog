<template>
  <div class="bg-gray-50 px-3 pt-3 flex flex-col items-center justify-center gap-2 grow min-h-[50vh] md:min-h-0">
    <p class="info-text text-center text-xl max-w-xl"><span class="text-3xl block font-bold">Hi there!</span> A
      verification email
      has being sent to your email. Head over there and verify your account to continue.</p>
  </div>
  <Transition name="toast">
    <Toast
      :toast="toast"
      v-if="showToast"
    />
  </Transition>
</template>

<script
  setup
  lang="ts"
>
import type Toast from '~/types/Toast';
import { sendEmailVerification, type AuthError } from 'firebase/auth';
import { useUserStore } from '~/stores/user'
definePageMeta({
  middleware: ['user-auth']
})

const { useToastNotification } = useToast()
const showToast = ref(false)
const toast = reactive<Toast>({
  type: 'success',
  text: ''
})

onMounted(async () => {
  const userStore = useUserStore();

  try {
    await sendEmailVerification(userStore.user!)
  } catch (err) {
    let error = err as AuthError
    useToastNotification(toast, "error", error.message, showToast)
  }
})
</script>

<style
  lang="scss"
  scoped
></style>
