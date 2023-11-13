<template>
  <NuxtLayout name="auth-layout">
    <NuxtLayout
      name="form-layout"
      form-header="Sign into your account"
      class="md:basis-1/2 lg:basis-1/2"
      @handle-submit="handleSubmit"
    >
      <CustomInput
        name="user-email"
        label="Email"
        type="email"
        id="email"
        required="true"
        v-model="userEmail"
      />
      <CustomInput
        name="user-password"
        label="Password"
        type="password"
        id="Password"
        required="true"
        v-model="userPassword"
      />
      <CallToAction
        button-text="Sign in"
        class="bg-gray-800 rounded-lg text-white"
      />
    </NuxtLayout>
  </NuxtLayout>
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

useHead({
  title: 'F1 Blog || Sign In'
})

const userStore = useUserStore()

const { useToastNotification } = useToast()
const showToast = ref(false)
const toast = reactive<Toast>({
  type: 'success',
  text: ''
})

const userEmail = ref("")
const userPassword = ref("")


const handleSubmit = async () => {
  try {

    const { data, error } = await useFetch<{ user: User }>('/api/signin', {
      method: 'POST',
      body: { email: userEmail.value, password: userPassword.value },

    })

    if (error && error.value?.statusCode === 500) {
      return useToastNotification(toast, 'error', error.value.statusMessage!, showToast)
    }

    if (data.value) {
      userStore.user = data.value.user
    }

    useToastNotification(toast, 'success', 'Login successful! Redirecting...', showToast, '/admin/')


  } catch (error) {
    useToastNotification(toast, 'error', 'There was an error sending your request!', showToast)
  }
}
</script>

<style lang="scss" scoped>
</style>
