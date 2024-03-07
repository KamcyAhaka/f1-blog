<template>
  <NuxtLayout name="auth-layout">
    <NuxtLayout
      name="form-layout"
      form-header="Sign into your account"
      class="gap-5 md:basis-1/2 lg:basis-1/2"
      @handle-submit="handleSubmit"
    >
      <CustomInput
        class="mx-auto"
        name="user-email"
        label="Email"
        type="email"
        id="email"
        required="true"
        v-model="userEmail"
      />
      <CustomInput
        class="mx-auto"
        name="user-password"
        label="Password"
        type="password"
        id="Password"
        required="true"
        v-model="userPassword"
      />
      <CallToAction
        button-text="Sign in"
        class="bg-gray-800 rounded-lg text-white mx-auto"
      />
      <p class="mx-auto text-center">Don't have an account? Create one <NuxtLink
          to="/auth/signup"
          class="underline text-blue-950"
        >now</NuxtLink>
      </p>
    </NuxtLayout>
  </NuxtLayout>
  <Transition name="toast">
    <Toast
      :toast="toast"
      v-if="showToast"
    />
  </Transition>
  <div
    class="loading-overlay fixed top-0 left-0 w-[100vw] h-[100vh] bg-black opacity-40 flex justify-center items-center"
    v-if="showLoader"
  >
    <component :is="ScaleLoader" />
  </div>
</template>

<script
  setup
  lang="ts"
>
import type Toast from '~/types/Toast';
import { useUserStore } from '~/stores/user';
import type { User } from 'firebase/auth';

useHead({
  title: 'F1 Blog || Sign In'
})

const userStore = useUserStore()

const router = useRouter()

const redirectPath = router.currentRoute.value.query.redirect as string || '/admin/';

const ScaleLoader = resolveComponent('ScaleLoader');

const { useToastNotification } = useToast()
const showToast = ref(false)
const showLoader = ref(false);
const toast = reactive<Toast>({
  type: 'success',
  text: ''
})

const userEmail = ref("")
const userPassword = ref("")


const handleSubmit = async () => {
  try {
    showLoader.value = true
    const { data, error } = await useFetch<{ user: User }>('/api/signin', {
      method: 'POST',
      body: { email: userEmail.value, password: userPassword.value },

    })

    showLoader.value = false

    if (error && error.value?.statusCode === 500) {
      return useToastNotification(toast, 'error', error.value.statusMessage!, showToast)
    }

    if (data.value) {
      userStore.user = data.value.user

      useToastNotification(toast, 'success', 'Login successful! Redirecting...', showToast, redirectPath)
    }

  } catch (error) {
    useToastNotification(toast, 'error', 'There was an error sending your request!', showToast)
  }
}
</script>

<style
  lang="scss"
  scoped
></style>
