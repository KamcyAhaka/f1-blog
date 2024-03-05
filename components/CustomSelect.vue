<template>
  <!-- Structure and styling adapted from https://codepen.io/raubaca/pen/bGWmZje -->
  <div class="flex flex-col gap-1">
    <label
      :for="props.id"
      class="font-semibold"
    >{{ props.label }}
      <span
        v-if="props.required === 'true'"
        class="text-red-600 font-bold"
      >*</span>
    </label>
    <select
      :id="props.id"
      class="text-sm appearance-none border border-black outline-none cursor-pointer"
      v-model="selectedCountry"
      @change="$emit('optionSelected', selectedCountry)"
      :required="props.required"
    >
      <option
        disabled
        value=""
      >
        {{ props.prompt }}
      </option>
      <slot name="options"></slot>
    </select>
  </div>
</template>

<script
  setup
  lang="ts"
>
const props = defineProps<{
  prompt: string,
  label: string,
  id: string,
  required?: 'true' | 'false'
}>()


const selectedCountry = ref('')
</script>

<style lang="scss">
$glass: rgba(255, 255, 255, 0.2);
$glass-icon: rgba(255, 255, 255, 0.3);
$gradient: linear-gradient(35deg, red, purple);
$option: #320a28;

/* <select> styles */
select {

  /* Personalize */
  height: 3em;
  padding: 0 4em 0 1em;
  background: url(https://upload.wikimedia.org/wikipedia/commons/9/9a/Caret_down_font_awesome.svg) no-repeat right 0.8em center / 1.4em,
    linear-gradient(to left, rgba(255, 255, 255, 0.589) 3em, $glass 3em);

  /* Remove focus outline */
  &:focus {
    outline: none;
  }
}
</style>
