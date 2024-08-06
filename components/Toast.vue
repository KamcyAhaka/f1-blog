<template>
  <div class="toast-container flex justify-center items-center fixed z-50 top-5 w-full min-h-[3vh] min:max-h-[5vh]">
    <div
      class="toast-notification w-[90%] mx-auto max-w-3xl h-full flex overflow-hidden rounded-2xl shadow-lg bg-white"
      :class="props.toast.type === 'success' ? 'border-green-500 border-2' : props.toast.type === 'error' ? 'border-red-500 border-2' : props.toast.type === 'warning' ? 'border-yellow-500 border-2' : ''"
    >
      <div
        class="toast-notification-icon flex items-center px-5 border-r-2 text-white"
        :class="props.toast.type === 'success' ? 'bg-green-500' : props.toast.type === 'error' ? 'bg-red-500' : props.toast.type === 'warning' ? 'bg-yellow-500' : ''"
      >
        <ClientOnly>
          <font-awesome-icon
            class="text-xl md:text-3xl"
            :icon="props.toast.type === 'success' ? ['fas', 'check'] : props.toast.type === 'error' ? ['fas', 'xmark'] : props.toast.type === 'warning' ? ['fas', 'triangle-exclamation'] : ''"
          />
        </ClientOnly>
      </div>
      <div class="toast-notification-text flex items-center p-3 ">{{ props.toast.text }}</div>
    </div>
  </div>
</template>

<script
  setup
  lang="ts"
>
import type ToastType from '~/types/Toast'

const props = defineProps<{
  toast: ToastType
}>()
</script>

<style
  lang="scss"
  scoped
></style>
