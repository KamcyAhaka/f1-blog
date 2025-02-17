<template>
	<main class="main px-3 pt-3 md:flex md:px-0 md:pt-0">
		<div class="user-bio-container flex gap-3 md:w-[40vw] md:flex-col md:border-r-2 md:pl-5 md:pt-5">
			<img
				:src="user.photoURL"
				alt=""
				class="user-img h-14 w-14 rounded-full border-2 object-cover md:h-32 md:w-32"
			/>
			<div class="user-bio-credetianls flex flex-col">
				<p class="user-name font-bold md:text-xl">
					{{ user.name }}
					<client-only v-if="$auth.currentUser?.emailVerified">
						<font-awesome-icon :icon="['fas', 'check-circle']" class="text-green-700" />
					</client-only>
				</p>
				<span class="user-email text-xs font-bold text-gray-400 md:text-sm">{{ user && user.email }}</span>
			</div>
		</div>
		<slot />
	</main>
</template>

<script setup lang="ts">
const { $auth } = useNuxtApp();

const user = reactive({
	name: "",
	email: "",
	photoURL: "",
});

onMounted(() => {
	if (!$auth.currentUser) {
		return navigateTo("/auth/signin", {
			redirectCode: 301,
		});
	}

	user.name = $auth.currentUser.displayName || "User";
	user.email = $auth.currentUser.email as string;
	user.photoURL = $auth.currentUser.photoURL as string;
});
</script>

<style lang="scss" scoped></style>
