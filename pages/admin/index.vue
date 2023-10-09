<template>
  <NuxtLayout name="profile-layout">
    <ul class="profile-actions-list mt-6 flex flex-col gap-7 md:w-full md:px-10">
      <NuxtLink to="/admin/edit-profile">
        <li class="profile-action cursor-pointer relative">
          <p class="text-sm font-bold">Edit Profile</p>
          <p class="text-xs text-gray-400 font-bold">Update your information</p>
          <client-only>
            <font-awesome-icon
              class="absolute top-1/2 -translate-y-1/2 right-2 text-sm text-gray-400"
              :icon="['fas', 'chevron-right']"
            />
          </client-only>
        </li>
      </NuxtLink>
      <NuxtLink to="/posts/">
        <li class="profile-action cursor-pointer relative">
          <p class="text-sm font-bold">View Posts</p>
          <p class="text-xs text-gray-400 font-bold">30 posts</p>
          <client-only>
            <font-awesome-icon
              class="absolute top-1/2 -translate-y-1/2 right-2 text-sm text-gray-400"
              :icon="['fas', 'chevron-right']"
            />
          </client-only>
        </li>
      </NuxtLink>

      <NuxtLink to="/profile/reviews">
        <li class="profile-action cursor-pointer relative">
          <p class="text-sm font-bold">My reviews</p>
          <p class="text-xs text-gray-400 font-bold">Reviewed 4 items</p>
          <client-only>
            <font-awesome-icon
              class="absolute top-1/2 -translate-y-1/2 right-2 text-sm text-gray-400"
              :icon="['fas', 'chevron-right']"
            />
          </client-only>
        </li>
      </NuxtLink>
      <li
        class="profile-action cursor-pointer relative"
        @click="logUserOut"
      >
        <p class="text-sm font-bold">Logout</p>
        <p class="text-xs text-gray-400 font-bold">End your session</p>
        <client-only>
          <font-awesome-icon
            class="absolute top-1/2 -translate-y-1/2 right-2 text-sm text-gray-400"
            :icon="['fas', 'chevron-right']"
          />
        </client-only>
      </li>
    </ul>
  </NuxtLayout>
  <transition name="toast">
    <Toast
      :toast="toast"
      text="Logout successful"
      v-if="showToast"
    />
  </transition>
</template>

<script setup lang="ts">
import { useUserStore } from '~/stores/user';
import type Toast from '~/types/Toast';

// @ts-ignore
definePageMeta({
  middleware: ['user-auth', 'verify-user', 'update-user']
})

const { useToastNotification } = useToast()
const showToast = ref(false)
const toast = reactive<Toast>({
  type: 'success',
  text: ''
})

const userStore = useUserStore()

const logUserOut = async () => {
  try {
    await useFetch('/api/signout')

    userStore.user = null;

    useToastNotification(toast, 'success', 'You have been successfully logged out.', showToast, '/')
  } catch (error) {
    useToastNotification(toast, 'error', 'An error occurred. Please try again later.', showToast,)
  }
}
</script>

<style lang="scss" scoped>
</style>
