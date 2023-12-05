<template>
  <NuxtLayout
    name="form-layout"
    form-header="Create a new blog post"
    class="gap-0 rounded-3xl overflow-hidden w-full basis-full"
  >
    <TipTap @articleSubmission="getDocument" />
  </NuxtLayout>
</template>

<script setup lang="ts">
const getDocument = (document: string) => console.log(document);
</script>

<style lang="scss">
.form-heading {
  margin-bottom: .5em;
}
</style>
