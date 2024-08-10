<template>
  <NuxtLayout name="auth-layout">
    <NuxtLayout
      name="form-layout"
      form-header="Create an account"
      class="gap-5 md:basis-1/2 lg:basis-1/2"
      @handle-submit="handleSubmit"
    >
      <CustomInput
        class="mx-auto"
        name="name"
        label="Username"
        type="text"
        id="Username"
        required="true"
        v-model="username"
      />
      <CustomInput
        class="mx-auto"
        name="email"
        label="Email"
        type="email"
        id="email"
        required="true"
        v-model="email"
      />
      <CustomInput
        class="mx-auto"
        name="password"
        label="Password"
        type="password"
        id="Password"
        v-model="password"
        required="true"
      />
      <CustomInput
        class="mx-auto"
        name="password-confirmation"
        label="Confirm Password"
        type="password"
        id="confirm-password"
        v-model="confirmPassword"
        required="true"
      />
      <CallToAction
        button-text="Create account"
        class="bg-gray-800 rounded-lg text-white mx-auto"
      />
      <p class="mx-auto text-center">Already have an account? Sign in <NuxtLink
          to="/auth/signin"
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


useHead({
  title: 'F1 Blog || Create Account'
})

const userStore = useUserStore()

const { useToastNotification } = useToast()
const { useSignUp, useTokenRetrieval } = useFirebaseAuth()
const ScaleLoader = resolveComponent('ScaleLoader');
const showLoader = ref(false);
const showToast = ref(false)
const toast = reactive<Toast>({
  type: 'success',
  text: ''
})

const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

const handleSubmit = async () => {
  if (confirmPassword.value !== password.value) {
    return useToastNotification(toast, 'error', 'Passwords must match', showToast)
  }

  showLoader.value = true

  try {
    const signUpResponse = await useSignUp(email.value, password.value, username.value)

    showLoader.value = false

    if (signUpResponse.type === 'error') {
      return useToastNotification(toast, 'error', signUpResponse.error.message, showToast)
    }

    userStore.user = signUpResponse.user;

    const tokenObject = await useTokenRetrieval()

    if (tokenObject.type === 'error') {
      return useToastNotification(toast, 'error', tokenObject.error.message, showToast)
    }

    if (tokenObject.type === 'redirect') return navigateTo(tokenObject.url)

    await useFetch('/api/admin/create', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${tokenObject.token}`
      },
      body: {
        id: signUpResponse.user?.uid,
        username: username.value
      }
    })

    return useToastNotification(toast, 'success', 'Account successfully created!', showToast, '/admin/verify-email')

  } catch (error) {
    useToastNotification(toast, 'error', 'There was an error sending your request!', showToast)
  }
}
</script>

<style
  lang="scss"
  scoped
></style>
