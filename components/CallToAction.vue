<template>
  <button
    class="uppercase text-sm px-5 py-3 font-bold transition-transform active:scale-90"
    :class="props.noBackground ? 'border-2 border-gray-700 text-gray-700' : ''"
  >
    {{ props.buttonText }}
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  buttonText: string,
  noBackground?: boolean
}>()
</script>

<style lang="scss" scoped>
</style>
