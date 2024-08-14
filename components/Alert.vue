<template>
  <div
    class="alert-container fixed top-2 right-2 flex items-center gap-2 border border-amber-300 rounded-xl shadow-lg bg-white pl-5 py-3 max-w-lg z-50"
  >
    <div>
      <client-only>
        <font-awesome-icon
          :icon="['fas', 'triangle-exclamation']"
          class="text-7xl text-amber-600 border-r border-black pr-3"
        />
      </client-only>
    </div>
    <p>{{ props.text }}</p>
  </div>
</template>

<script
  setup
  lang="ts"
>
const props = defineProps<{
  text: string
}>()
</script>

<style
  lang="scss"
  scoped
></style>
