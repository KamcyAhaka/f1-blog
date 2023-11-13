<template>
  <div class="input-container flex flex-col gap-2 mb-3">
    <label
      :for="props.id"
      class="font-semibold"
    >{{ props.label }}
      <span
        v-if="props.required === 'true'"
        class="text-red-600 font-bold"
      >*</span>
    </label>
    <input
      :type="props.type"
      :id="props.id"
      :name="props.name"
      :required="true"
      :accept="props.accepts"
      class=""
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.files)"
    >
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  label: string,
  type: string,
  id: string,
  name: string,
  modelValue?: string,
  accepts?: string,
  required?: 'true' | 'false'
  placeholder?: string,
}>()

defineEmits(['update:modelValue'])
</script>

<style lang="scss" scoped>
input {
  outline: none;
}
</style>
