<template>
  <section
    class="newsletter-section flex flex-col justify-center px-4 gap-3 w-full max-w-5xl mx-auto min-h-[30vh] my-10 py-10 bg-gray-200 md:min-h-[25vh] lg:rounded-3xl lg:min-h-[35vh]"
  >
    <h2 class="text-2xl font-bold text-center text-gray-900">Subscribe to our Newsletter</h2>
    <p class="text-xs text-gray-600 text-center max-w-md self-center">Get the latest team news, paddock gossip and race
      week gists in
      and
      around F1
      delivered right to
      your inbox.</p>
    <div class="input-container flex flex-col gap-2 items-center md:flex-row md:justify-center">
      <input
        type="email"
        placeholder="Enter your email..."
        class="px-3 py-2 border-2 border-gray-400 w-4/5 max-w-sm"
      >
      <CallToAction
        button-text="Subscribe"
        class="rounded-lg shadow-md bg-gray-700 text-white"
      />
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
input {
  outline: none;
}
</style>
