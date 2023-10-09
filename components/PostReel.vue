<template>
  <div
    class="post-reel-container bg-gray-600 px-5 py-3 flex flex-col gap-3 items-center justify-center text-center min-h-[40vh]"
  >
    <span class="post-tag text-sm font-bold text-white">{{ props.post.tag }}
    </span>
    <h2 class="post-title text-2xl font-bold text-white">{{props.post.title}}</h2>
    <p class="post-reel text-sm text-gray-300">{{props.post.text}}</p>
    <CallToAction
      button-text="Read more"
      class="bg-white text-gray-700 rounded-full px-10 text-xs"
    />

  </div>
</template>

<script setup lang="ts">
import PostReel from '~/types/PostReel'

const props = defineProps<{
  post: PostReel
}>()
</script>

<style lang="scss" scoped>
.post-reel-container {
  @media screen and (min-width: 1024px) {
    @apply min-h-[50vh] gap-5;
  }

  & > * {
    @apply max-w-lg;
  }
}
</style>
