<template>
  <div class="bg-gray-50 px-3 pt-3 flex flex-col items-center justify-center gap-2 grow min-h-[50vh] md:min-h-0">
    <p class="info-text text-center text-xl max-w-xl"><span class="text-3xl block font-bold">Hi there!</span> A
      verification email
      has being sent to your email. Head over there and verify your account to continue.</p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['user-auth']
})
</script>

<style lang="scss" scoped>
</style>
