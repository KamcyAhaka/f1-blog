<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="px-3 pt-3">
    <main class="main flex flex-col justify-center min-h-[50vh] gap-5">
      <p class="welcome-text text-center text-2xl"><span class="text-4xl block font-bold">Hi there!</span> It's nice to
        see you!</p>
      <div class="btn-container flex flex-col items-center justify-center gap-5 md:flex-row">
        <CallToAction
          buttonText="Sign in"
          @click="redirectToSignIn"
          class="bg-gray-700 text-white rounded-full px-6 w-full max-w-xs py-3  md:py-4"
        />
        <CallToAction
          buttonText="Create new account"
          :no-background="true"
          class="rounded-full px-6 w-full max-w-xs py-3  md:py-4"
          @click="redirectToSignUp"
        />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'F1 Blog || Sign In / Sign Up'
})

const redirectToSignIn = () => {
  return navigateTo('/auth/signin')
}
const redirectToSignUp = () => {
  return navigateTo('/auth/signup')
}
</script>

<style scoped lang="scss">
</style>
