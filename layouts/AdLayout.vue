<template>
  <div class="container min-w-full flex flex-col gap-5 md:flex-row md:gap-10 lg:justify-center">
    <slot />
    <aside
      class="aside flex flex-col gap-5 lg:basis-1/3"
      :class="props.withBg ? 'bg-gray-100 px-5 py-7 rounded-lg' : ''"
    >
      <div class="posts-container bg-white p-5 rounded-xl flex flex-col gap-5 shadow-lg">
        <h3 class="font-bold">{{ props.asideHeading }}</h3>
        <PostHighlight
          v-for="(post, index) in posts"
          :key="index"
          :post="post"
        />
      </div>
      <div class="ad-container bg-red-200 h-[300px] aspect-square rounded-lg"></div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import type PostHighlight from '~/types/PostHighlight'

const props = defineProps<{
  asideHeading: string,
  posts: PostHighlight[],
  withBg?: boolean
}>()
</script>

<style lang="scss" scoped>
</style>
