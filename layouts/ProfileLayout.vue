<template>
  <main class="main px-3 pt-3 md:flex md:px-0 md:pt-0">
    <div class="user-bio-container flex gap-3 md:w-[40vw] md:flex-col md:border-r-2 md:pl-5 md:pt-5">
      <img
        :src="user.photoURL"
        alt=""
        class="user-img object-cover w-14 h-14 rounded-full border-2 md:w-32 md:h-32"
      />
      <div class="user-bio-credetianls flex flex-col">
        <p class="user-name font-bold md:text-xl">{{ user.name
          }}
          <client-only v-if="userStore.user?.emailVerified">
            <font-awesome-icon
              :icon="['fas', 'check-circle']"
              class="text-green-700"
            />
          </client-only>
        </p>
        <span class="user-email text-xs text-gray-400 font-bold md:text-sm">{{ user &&
          user.email }}</span>
      </div>
    </div>
    <slot />
  </main>
</template>

<script
  setup
  lang="ts"
>
import { useUserStore } from '~/stores/user'
import getRandomHexColor from '~/utils/getRandomColours';

const userStore = useUserStore()

const user = reactive({
  name: '',
  email: '',
  photoURL: ''
})

onMounted(() => {
  user.name = userStore.user?.displayName ? userStore.user?.displayName : 'User'
  user.email = userStore.user?.email as string
  user.photoURL = userStore.user?.photoURL as string
})
</script>

<style
  lang="scss"
  scoped
></style>
