<template>
  <div
    class="post-highlight flex gap-4 max-w-sm"
    v-if="props.size === 'base' || props.size === undefined"
  >
    <img
      :src="props.post.imgUrl"
      alt=""
      class="post-img h-20 aspect-video rounded-lg border-2"
    >
    <NuxtLink
      to="/"
      class="post-highlight__text-container flex flex-col gap-2"
    >
      <h4 class="text-xs font-bold">{{ props.post.title }}</h4>
      <p class="text-xs text-gray-500">{{ props.post.date }}</p>
    </NuxtLink>
  </div>
  <div
    class="post-highlight bg-white shadow-md p-5 rounded-lg max-w-xl flex flex-col gap-5 md:flex-row"
    v-if="props.size === 'lg'"
  >
    <img
      :src="props.post.imgUrl"
      alt=""
      class="post-img min-h-full aspect-video object-cover rounded-lg border-2 w-full lg:max-w-[250px]"
    >
    <div class="post-highlight__text-container flex flex-col justify-center gap-2 text-xs">
      <p class="text-xs">{{ props.post.tag }} . {{ props.post.length }} min read</p>
      <h4 class="text-sm font-bold">{{ props.post.title }}</h4>
      <p class="text-sm md:text-xs">{{props.post.text}}</p>
      <p>{{ props.post.author }} . {{ props.post.date }}</p>

    </div>
  </div>
</template>

<script setup lang="ts">
import type PostHighlight from '~/types/PostHighlight'

const props = defineProps<{
  post: PostHighlight,
  size?: 'base' | 'lg'
}>()
</script>

<style lang="scss" scoped>
</style>
