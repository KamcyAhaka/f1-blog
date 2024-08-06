<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <h1 class="flex flex-col gap-2 text-2xl text-center my-5 font-bold capitalize">
    <span>All of our works</span>
    <span>In its finest glory</span>
  </h1>
  <div class="blog-search-input-container w-[90%] mx-auto">
    <input
      type="search"
      class="rounded-3xl rounded-r-none p-2 px-4 border-2 border-black"
    >
    <button class="rounded-3xl rounded-l-none p-[10px] bg-black text-white">Search</button>
  </div>
  <section class="main-blog-posts-section">
    <div class="blog-post">
      <img
        src=""
        alt=""
        class="post-cover-img"
      >
      <h2 class="post-title">Lorem ipsum dolor sit amet.</h2>
      <p class="post-snippet">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum sint possimus quam! Odit,
        repellendus deserunt.</p>
    </div>
  </section>
</template>

<script
  setup
  lang="ts"
></script>

<style
  lang="scss"
  scoped
></style>
