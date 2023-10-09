<template>
  <div
    v-if="props.align === 'left' || props.align === undefined"
    class="category-card flex flex-col gap-2"
  >
    <img
      :src="props.post.imgUrl"
      alt=""
      class="category-card__img w-full aspect-video object-cover rounded-lg border-2"
    >
    <span class="category-card__tag--length text-xs">{{ props.post.tag }} . {{ props.post.length }} min read</span>
    <h3 class="category-tag font-bold text-sm">{{ props.post.title }}</h3>
    <p class="category-card__text text-sm">{{ props.post.text }}</p>
    <span class="category-card__author--date text-xs">{{ props.post.author }} . {{ props.post.date }}</span>
  </div>
  <div
    v-if="props.align === 'center'"
    class="category-card flex flex-col gap-2 text-center max-w-[350px]"
  >
    <img
      :src="props.post.imgUrl"
      alt=""
      class="category-card__img w-full aspect-video object-cover rounded-lg border-2"
    >
    <h3 class="category-tag font-bold text-sm">{{ props.post.title }}</h3>
    <span class="post--author--date-length text-xs">{{ props.post.author }} . {{ props.post.date }} . {{ props.post.length
      }} min
      read</span>
    <p class="category-card__text text-sm">{{ props.post.text }}</p>
  </div>
</template> 

<script setup lang="ts">
import type PostHighlight from '~/types/PostHighlight'

const props = defineProps<{
  post: PostHighlight,
  align?: 'left' | 'center'
}>()
</script>

<style lang="scss" scoped>
</style>
