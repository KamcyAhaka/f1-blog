<template>
  <div class="main-content grow h-full flex flex-col gap-5 md:flex-row md:gap-0">
    <div class="img-container w-full md:basis-1/2 md:grow lg:basis-3/5">
      <img
        src="/img/ai-generated-car.png"
        alt=""
        class="w-full h-full object-cover"
      >
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  formHeading: string
}>()
</script>

<style lang="scss" scoped>
</style>
