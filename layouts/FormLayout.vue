<template>
  <form
    @submit.prevent="emitSubmit"
    class="w-full mx-auto flex flex-col justify-center gap-5 pb-10 px-8 md:basis-2/5 lg:basis-[600px] lg:pt-10"
  >
    <h1 class="text-3xl font-bold capitalize">{{ props.formHeader }}</h1>
    <slot />
  </form>
</template>

<script setup lang="ts">
const props = defineProps<{
  formHeader: string
}>()

const emits = defineEmits()

const emitSubmit = (event: Event) => {
  emits('handle-submit', event)
}
</script>

<style lang="scss">
form > * {
  @apply w-full max-w-md mx-auto;
}
</style>
