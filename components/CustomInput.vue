<template>
  <div class="input-container flex flex-col mb-3">
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
      :placeholder="props.placeholder"
      :required="true"
      class="border-b-2 border-gray-700"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value)"
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
