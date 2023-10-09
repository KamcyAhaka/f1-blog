<template>
  <header class="header">
    <nav class="nav flex items-center justify-evenly bg-gray-100 min-h-[10vh] lg:justify-around lg:min-h-[15vh]">
      <NuxtLink to="/">F1 Blog</NuxtLink>
      <menu
        class="nav__menu fixed top-0 
      bg-slate-100 z-10 left-0 min-h-screen pt-10 w-full max-w-[250px] shadow-2xl capitalize transition duration-500"
        :class="menuOpenState ? 'translate-x-0' : '-translate-x-[200%]'"
      >
        <li
          class="nav__menu__item flex w-full pl-8 pr-10 py-3 lg:flex lg:items-center lg:justify-center lg:px-5 lg:w-[unset]"
        >
          <NuxtLink
            class="nav__menu__link"
            to="/categories/"
          >Categories</NuxtLink>
        </li>
        <li
          class="nav__menu__item flex w-full pl-8 pr-10 py-3 lg:flex lg:items-center lg:justify-center lg:px-5 lg:w-[unset]"
        >
          <NuxtLink
            class="nav__menu__link"
            to="/authors/"
          >Authors</NuxtLink>
        </li>
        <li
          class="nav__menu__item flex w-full pl-8 pr-10 py-3 lg:flex lg:items-center lg:justify-center lg:px-5 lg:w-[unset]"
        >
          <NuxtLink
            class="nav__menu__link"
            to="/careers/"
          >Join our team</NuxtLink>
        </li>
        <li
          class="nav__menu__item flex w-full pl-8 pr-10 py-3 lg:flex lg:items-center lg:justify-center lg:px-5 lg:w-[unset]"
        >
          <NuxtLink
            class="nav__menu__link"
            to="/contact"
          >Contact</NuxtLink>
        </li>
      </menu>
      <ul class="nav__socials-container flex justify-between gap-5">
        <li>
          <NuxtLink class="nav__social-icon">
            <client-only>
              <font-awesome-icon :icon="['fab', 'twitter']" />
            </client-only>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink class="nav__social-icon">
            <client-only>
              <font-awesome-icon :icon="['fab', 'instagram']" />
            </client-only>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink class="nav__social-icon">
            <client-only>
              <font-awesome-icon :icon="['fab', 'facebook']" />
            </client-only>
          </NuxtLink>
        </li>
      </ul>
      <button
        @click="toggleMenuOpenState"
        class="nav__hamburger-menu-btn lg:hidden"
      >
        <client-only>
          <font-awesome-icon
            class="transition-all duration-300"
            :icon="menuOpenState ? ['fas', 'xmark'] : ['fas', 'bars']"
          />
        </client-only>
      </button>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const menuOpenState = ref(false)

const toggleMenuOpenState = () => menuOpenState.value = !menuOpenState.value
</script>

<style lang="scss" scoped>
.nav__menu__item.active {
  @apply bg-white shadow-md;
}

.nav__menu {
  @media screen and (min-width: 1024px) {
    @apply static flex items-center justify-center min-h-0 bg-transparent shadow-none max-w-[60%] left-[unset] translate-x-[unset] text-black pt-0 top-[unset] gap-3;
  }
}
</style>
