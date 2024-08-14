<template>
  <div class="bg-gray-50 px-3 pt-3 flex flex-col items-center justify-center gap-2 grow min-h-[50vh] md:min-h-[60vh]">
    <div
      class="loader text-center flex flex-col items-center"
      v-if="response === null"
    >
      <MoonLoader
        :loading="true"
        color="#000000"
        :size="70"
        size-unit="px"
      />
      <p class="text-3xl capitalize">
        Just a second...
      </p>
    </div>
    <div
      class="content"
      v-if="response !== null"
    >
      <div
        class="error-content"
        v-if="response.type === 'error'"
      >
        <client-only>
          <font-awesome-icon
            class="text-9xl text-red-700"
            :icon="['fas', 'triangle-exclamation']"
          />
        </client-only>
        <h1 class="info-text text-center text-xl max-w-xl">Uh oh! An error occurred. Let's try that again.</h1>
      </div>
      <div v-else>
        <client-only>
          <font-awesome-icon
            class="text-9xl text-green-700"
            :icon="['fas', 'check']"
          />
        </client-only>
        <p class="info-text text-center text-xl max-w-xl">
          <span class="text-3xl block font-bold">Yay! 🥳 🎊</span>You have been successfully verified. Where would you
          like
          to
          go next?
        </p>
      </div>
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
import { useUserStore } from '~/stores/user';
import { reload, type AuthError } from 'firebase/auth';
import { auth } from '~/firebase';

type VerificationReturnType =
  | { type: 'success'; result: true }
  | { type: 'error'; error: AuthError };

const router = useRouter()

const { useToastNotification } = useToast()
const { useEmailVerification } = useFirebaseAuth()
const showToast = ref(false)
const toast = reactive<Toast>({
  type: 'success',
  text: ''
})

let response: Ref<VerificationReturnType | null> = ref(null);

const currentRoute = router.currentRoute.value
const oobCode = currentRoute.query.oobCode as string

try {
  response.value = await useEmailVerification(oobCode)

  if (response.value.type === 'error') {
    useToastNotification(toast, 'error', response.value.error.message, showToast)
  }

  else {
    if (auth.currentUser) {
      await reload(auth.currentUser)
      useToastNotification(toast, 'success', 'Email verified successfully. Redirecting...', showToast, '/admin/')
    }

    else {
      navigateTo("/auth/signin?redirect=/admin/")
    }
  }
} catch (error) {
  useToastNotification(toast, 'error', 'There was an error sending your request!', showToast)
}

</script>

<style
  lang="scss"
  scoped
></style>
