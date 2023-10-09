<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="min-h-screen flex
    flex-col justify-center">
    <MainNavigation />
    <main class="main-content grow flex flex-col">
      <slot />

    </main>
    <button class="back-to-top-btn fixed bottom-52 right-10 z-[99] drop-shadow-xl lg:right-20">
      <client-only>
        <font-awesome-icon
          class="text-white bg-gray-700 p-2 aspect-square rounded-full"
          :icon="['fas', 'arrow-up']"
        />
      </client-only>
    </button>
    <MainFooter />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
</style>
