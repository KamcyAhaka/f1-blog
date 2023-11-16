<template>
  <div
    class="toast-notification w-full fixed top-5 right-0 min-h-[8vh] max-w-sm mx-auto text-white flex rounded-s-2xl shadow-lg"
    :class="props.toast.type === 'success' ? 'bg-green-500' : props.toast.type === 'error' ? 'bg-red-500' : props.toast.type === 'warning' ? 'bg-yellow-500' : ''"
  >
    <div class="toast-notification-icon flex items-center px-5 border-r-2">
      <ClientOnly>
        <font-awesome-icon
          class="text-3xl"
          :icon="props.toast.type === 'success' ? ['fas', 'check'] : props.toast.type === 'error' ? ['fas', 'xmark'] : props.toast.type === 'warning' ? ['fas', 'triangle-exclamation'] : ''"
        />
      </ClientOnly>
    </div>
    <div class="toast-notification-text flex items-center px-5 py-3">{{ props.toast.text }}</div>
  </div>
</template>

<script setup lang="ts">
import type ToastType from '~/types/Toast'

const props = defineProps<{
  toast: ToastType
}>()
</script>

<style lang="scss" scoped>
</style>
