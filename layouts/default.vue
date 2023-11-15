<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="min-h-screen flex
    flex-col justify-center">
    <MainNavigation />
    <main class="main-content grow flex flex-col">
      <slot />

    </main>
    <MainFooter />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
</style>
