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
        required="true"
      />
      <CallToAction
        button-text="Create account"
        class="bg-gray-800 rounded-lg text-white mx-auto"
      />
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

<script setup lang="ts">
import type Toast from '~/types/Toast';
import type { User } from 'firebase/auth';

import { useUserStore } from '~/stores/user';


useHead({
  title: 'F1 Blog || Create Account'
})

const userStore = useUserStore()

const { useToastNotification } = useToast()
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

const handleSubmit = async () => {
  showLoader.value = true

  try {
    const { data, error } = await useFetch<{ user: User }>('/api/signup', {
      method: 'POST',
      body: { username: username.value, email: email.value, password: password.value },
    })

    showLoader.value = false

    if (error && error.value?.statusCode === 500) {
      return useToastNotification(toast, 'error', error.value.statusMessage!, showToast)
    }


    if (data.value) {
      userStore.user = data.value.user
    }

    useToastNotification(toast, 'success', 'Account successfully created!', showToast, '/admin/verify-email')


  } catch (error) {
    useToastNotification(toast, 'error', 'There was an error sending your request!', showToast)
  }
}

</script>

<style lang="scss" scoped>
</style>
