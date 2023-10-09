<template>
  <div class="bg-gray-50 px-3 pt-3 flex flex-col items-center justify-center gap-2 grow min-h-[50vh] md:min-h-0">
    <p class="info-text text-center text-xl max-w-xl">
      <span class="text-3xl block font-bold">Yay! 🥳 🎊</span>You have been successfully verified. Where would you like to go next?
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
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['user-auth']
})
</script>

<style lang="scss" scoped></style>
