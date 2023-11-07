<template>
  <div :class="`${props.inputName}-input-container-wrapper flex flex-col gap-1 py-2`">
    <div :class="`${props.inputName}-input-container-wrapper flex items-start gap-2`">
      <CustomInput
        v-for="radio in props.radios"
        :id="radio.id"
        :name="props.inputName"
        :label="radio.label"
        type="radio"
        :value="radio.value"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  containerLabel: string,
  inputName: string,
  radios: {
    id: string,
    label: string,
    value: string,
  }[]
}>()
</script>

<style lang="scss" scoped>
</style>
