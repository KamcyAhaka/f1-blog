<template>
  <div class="bg-gray-50 px-3 pt-3 flex flex-col items-center justify-center gap-2 grow min-h-[50vh] md:min-h-0">
    <p class="info-text text-center text-xl max-w-xl">
      <span class="text-3xl block font-bold">Yay! 🥳 🎊</span>You have been successfully verified. Where would you like to
      go next?
    </p>
    <div class="btn-container flex flex-col items-center justify-center gap-5 md:flex-row">
      <CallToAction
        buttonText="Home"
        @click="navigateTo('/')"
        class="bg-gray-700 text-white rounded-full px-6 w-full max-w-xs py-3  md:py-4"
      />
      <CallToAction
        buttonText="Profile"
        :no-background="true"
        class="rounded-full px-6 w-full max-w-xs py-3  md:py-4"
        @click="navigateTo('/admin/')"
      />
    </div>
  </div>
  <Transition name="toast">
    <Toast
      :toast="toast"
      v-if="showToast"
    />
  </Transition>
</template>

<script setup lang="ts">
import type Toast from '~/types/Toast';
import { useUserStore } from '~/stores/user';
import { User } from 'firebase/auth';


definePageMeta({
  middleware: ['user-auth']
})

const router = useRouter()

const { useToastNotification } = useToast()
const showToast = ref(false)
const toast = reactive<Toast>({
  type: 'success',
  text: ''
})

const currentRoute = router.currentRoute.value
const oobCode = currentRoute.query.oobCode as string

const userStore = useUserStore()

try {
  const { data, error } = await useFetch<{ verifiedUser: User }>(`/api/verify-email`, {
    method: "POST",
    query: { oobCode },
  })

  if (error && error.value?.statusCode === 500) {
    useToastNotification(toast, 'error', error.value.statusMessage!, showToast)
  }

  if (data.value) {

    useToastNotification(toast, 'success', 'Successfully Verified!', showToast)

    userStore.user = data.value.verifiedUser
  }
} catch (error) {
  useToastNotification(toast, 'error', 'There was an error sending your request!', showToast)
}

</script>

<style lang="scss" scoped>
</style>
