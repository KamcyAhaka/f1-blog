<template>
  <NuxtLayout
    name="ad-layout"
    aside-heading="Popular Posts"
    :with-bg="true"
    :posts="useLatestPosts()"
    class="p-10"
  >
    <div class="blog-content flex flex-col gap-3 lg:flex-row lg:justify-between lg:basis-2/3">
      <div class="table-of-content text-xs uppercase lg:basis-1/4">Table of content</div>
      <div class="page-content flex flex-col gap-2 lg:basis-3/4">
        <PostNavigation post-category="Race report" />
        <div class="post-content">
          <h1 class="post__title text-2xl font-bold text-gray-700">Monza GP Report: The Temple of Speed Delivers</h1>
          <span class="post__author--date--length text-xs text-gray-600">Joan Doe Smith . Mar 15, 2022 . 10 min
            read</span>
          <img
            src=""
            alt=""
            class="post__headline-img w-full aspect-video border-2 rounded-lg"
          >
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const {useLatestPosts} = usePosts()
</script>

<style lang="scss" scoped>
</style>
