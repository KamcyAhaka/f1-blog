<template>
  <div class="input-container flex flex-col mb-3 relative">
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
      :type="props.type === 'password' ? passwordType : props.type"
      :id="props.id"
      :name="props.name"
      :placeholder="props.placeholder"
      :required="true"
      class="border-b-2 border-gray-700"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value)"
    >
    <button
      v-if="props.type === 'password'"
      class="absolute right-0 bottom-3 text-xl"
      @click.prevent="togglePasswordVisibility"
    >
      <client-only>
        <font-awesome-icon
          v-if="passwordType === 'password'"
          :icon="['fas', 'eye']"
        />
        <font-awesome-icon
          v-else
          :icon="['fas', 'eye-slash']"
        />
      </client-only>
    </button>
  </div>
</template>

<script
  setup
  lang="ts"
>

const props = defineProps<{
  label: string,
  type: string,
  id: string,
  name: string,
  modelValue?: string,
  required?: 'true' | 'false'
  placeholder?: string,
}>()

const passwordType = ref(props.type)

const togglePasswordVisibility = () => {
  if (passwordType.value === 'password') {
    passwordType.value = 'text'
  } else {
    passwordType.value = 'password'
  }
}

defineEmits(['update:modelValue'])
</script>

<style
  lang="scss"
  scoped
>
input {
  outline: none;
}
</style>
