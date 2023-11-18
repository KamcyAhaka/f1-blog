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
</template>

<script setup lang="ts">
import type Toast from '~/types/Toast';

useHead({
  title: 'F1 Blog || Create Account'
})

const { useToastNotification } = useToast()
const showToast = ref(false)
const toast = reactive<Toast>({
  type: 'success',
  text: ''
})

const email = ref('');
const password = ref('');

const handleSubmit = async () => {

  try {
    const { error } = await useFetch('/api/signup', {
      method: 'POST',
      body: { email: email.value, password: password.value },
    })

    if (error && error.value?.statusCode === 500) {
      return useToastNotification(toast, 'error', error.value.statusMessage!, showToast)
    }

    useToastNotification(toast, 'success', 'Account successfully created!', showToast, '/auth/signin')


  } catch (error) {
    useToastNotification(toast, 'error', 'There was an error sending your request!', showToast)
  }
}

</script>

<style lang="scss" scoped>
</style>
