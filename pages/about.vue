<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <NuxtLayout
    name="ad-layout"
    aside-heading="Recent posts"
    :posts="useLatestPosts()"
    class="py-10 px-8 lg:px-24 lg:gap-40"
  >
    <div class="page-content md:basis-2/3 flex flex-col gap-3">
      <PostNavigation post-category="" />
      <h1 class="text-3xl text-gray-700 font-bold">About</h1>
      <img class="about-img w-full aspect-video border-2 rounded-xl max-h-[250px]" />
    </div>
  </NuxtLayout>
  <NewsletterSubscription class="lg:min-h-[40vh] max-w-6xl" />
</template>

<script setup lang="ts">
const {useLatestPosts} = usePosts()
</script>

<style lang="scss" scoped>
</style>
