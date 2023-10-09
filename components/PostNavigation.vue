<template>
  <nav class="blog-navigation flex gap-3 text-sm text-gray-800">
    <NuxtLink to="/">Blog</NuxtLink> /
    <NuxtLink :to="`/categories/${props.postCategory}`">{{ props.postCategory }}</NuxtLink>
  </nav>
</template>

<script setup lang="ts">
const props = defineProps<{
  postCategory: string
}>()
</script>

<style lang="scss" scoped>
</style>
