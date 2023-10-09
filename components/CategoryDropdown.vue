<template>
  <ul
    class="category-dropdown flex flex-col justify-center gap-3 absolute top-6 right-0 bg-gray-700 text-white w-[200px] shadow-xl rounded-lg"
  >
    <li
      v-for="(category, index) in props.categories"
      :key="index"
      class="font-normal flex items-center justify-center border-b-2"
    >
      <button class="w-full px-3 py-2 text-sm text-left">{{ category }}</button>
    </li>
  </ul>
</template>

<script setup lang="ts">
const props = defineProps<{
  categories: string[];
}>()
</script>

<style lang="scss" scoped>
</style>
