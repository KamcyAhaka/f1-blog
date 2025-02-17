<template>
	<header ref="mainNavigation" class="header">
		<nav class="nav flex min-h-[10vh] items-center justify-evenly bg-gray-100 lg:min-h-[15vh] lg:justify-around">
			<NuxtLink to="/">F1 Blog</NuxtLink>
			<menu
				class="nav__menu fixed left-0 top-0 z-10 min-h-screen w-full max-w-[250px] bg-slate-100 pt-10 capitalize shadow-2xl transition duration-500"
				:class="menuOpenState ? 'translate-x-0' : '-translate-x-[200%]'"
			>
				<li
					class="nav__menu__item flex w-full py-3 pl-8 pr-10 lg:flex lg:w-[unset] lg:items-center lg:justify-center lg:px-5"
				>
					<NuxtLink class="nav__menu__link" to="/categories/">Categories</NuxtLink>
				</li>
				<li
					class="nav__menu__item flex w-full py-3 pl-8 pr-10 lg:flex lg:w-[unset] lg:items-center lg:justify-center lg:px-5"
				>
					<NuxtLink class="nav__menu__link" to="/authors/">Authors</NuxtLink>
				</li>
				<li
					class="nav__menu__item flex w-full py-3 pl-8 pr-10 lg:flex lg:w-[unset] lg:items-center lg:justify-center lg:px-5"
				>
					<NuxtLink class="nav__menu__link" to="/careers/">Join our team</NuxtLink>
				</li>
				<li
					class="nav__menu__item flex w-full py-3 pl-8 pr-10 lg:flex lg:w-[unset] lg:items-center lg:justify-center lg:px-5"
				>
					<NuxtLink class="nav__menu__link" to="/contact">Contact</NuxtLink>
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
			<button class="nav__hamburger-menu-btn lg:hidden" @click="toggleMenuOpenState">
				<client-only>
					<font-awesome-icon
						class="transition-all duration-300"
						:icon="menuOpenState ? ['fas', 'xmark'] : ['fas', 'bars']"
					/>
				</client-only>
			</button>
		</nav>
	</header>
	<button ref="backToTopBtn" class="back-to-top-btn fixed bottom-52 right-10 z-[99] drop-shadow-xl lg:right-20">
		<client-only>
			<font-awesome-icon
				class="aspect-square rounded-full bg-gray-700 p-2 text-white"
				:icon="['fas', 'arrow-up']"
			/>
		</client-only>
	</button>
</template>

<script setup lang="ts">
const mainNavigation: Ref<HTMLElement | null> = ref(null);
const backToTopBtn: Ref<HTMLButtonElement | null> = ref(null);

const menuOpenState = ref(false);

const toggleMenuOpenState = () => (menuOpenState.value = !menuOpenState.value);

const showBackToTopBtn = (backToTopBtn: HTMLButtonElement, entries: HTMLElement) => {
	const intersectionObserver = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (!entry.isIntersecting) {
				backToTopBtn.classList.add("show");
			} else {
				backToTopBtn.classList.remove("show");
			}
		});
	}, {});

	intersectionObserver.observe(entries);
};

onMounted(() => {
	if (mainNavigation.value && backToTopBtn.value) {
		showBackToTopBtn(backToTopBtn.value, mainNavigation.value);
	}
});
</script>

<style lang="scss">
.nav__menu__item.active {
	@apply bg-white shadow-md;
}

.nav__menu {
	@media screen and (min-width: 1024px) {
		@apply static left-[unset] top-[unset] flex min-h-0 max-w-[60%] translate-x-[unset] items-center justify-center gap-3 bg-transparent pt-0 text-black shadow-none;
	}
}

.back-to-top-btn {
	opacity: 0;
	transform: translateY(50px);
	transition: all 0.3s ease;
}

.back-to-top-btn.show {
	opacity: 1;
	transform: translateY(0);
}
</style>
