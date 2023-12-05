<template>
  <main class="main px-3 pt-3 md:flex md:px-0 md:pt-0">
    <div class="user-bio-container flex gap-3 md:w-[40vw] md:flex-col md:border-r-2 md:pl-5 md:pt-5">
      <img
        src=""
        alt=""
        class="user-img w-14 h-14 rounded-full border-2 md:w-32 md:h-32"
      />
      <div class="user-bio-credetianls flex flex-col">
        <p class="user-name font-bold md:text-xl">{{ user?.displayName
        }}</p>
        <span class="user-email text-xs text-gray-400 font-bold md:text-sm">{{ user &&
          user.email }}</span>
      </div>
    </div>
    <slot />
  </main>
</template>

<script setup lang="ts">
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()

const user = userStore.user
</script>

<style lang="scss" scoped>
</style>
