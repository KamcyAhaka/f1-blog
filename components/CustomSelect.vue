<template>
  <!-- Structure and styling adapted from https://codepen.io/raubaca/pen/bGWmZje -->
  <select
    class="text-sm"
    v-model="selectedCountry"
    @change="$emit('optionSelected', selectedCountry)"
  >
    <option
      disabled
      value=""
    >
      Please select one
    </option>
    <slot name="options"></slot>
  </select>
</template>

<script setup lang="ts">
const selectedCountry = ref('')
</script>

<style lang="scss">
$glass: rgba(255, 255, 255, 0.2);
$glass-icon: rgba(255, 255, 255, 0.3);
$gradient: linear-gradient(35deg, red, purple);
$option: #320a28;

/* <select> styles */
select {
  /* Reset */
  appearance: none;
  border: 0;
  outline: 0;
  /* Personalize */
  height: 3em;
  padding: 0 4em 0 1em;
  background: url(https://upload.wikimedia.org/wikipedia/commons/9/9a/Caret_down_font_awesome.svg) no-repeat right 0.8em center / 1.4em,
    linear-gradient(to left, rgba(255, 255, 255, 0.589) 3em, $glass 3em);
  border-radius: 0.25em;
  box-shadow: 0 0 1em 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;

  /* <option> colors */
  option {
    color: inherit;
    background-color: $option;
  }

  /* Remove focus outline */
  &:focus {
    outline: none;
  }

  /* Remove IE arrow */
  &::-ms-expand {
    display: none;
  }
}
</style>
