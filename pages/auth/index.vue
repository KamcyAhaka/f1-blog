<template>
	<div class="px-3 pt-3">
		<main class="main flex min-h-[50vh] flex-col justify-center gap-5">
			<p class="welcome-text text-center text-2xl">
				<span class="block text-4xl font-bold">Hi there!</span> It's nice to see you!
			</p>
			<div class="btn-container flex flex-col items-center justify-center gap-5 md:flex-row">
				<CallToAction
					button-text="Sign in"
					class="w-full max-w-xs rounded-full bg-gray-700 px-6 py-3 text-white md:py-4"
					@click="redirectToSignIn"
				/>
				<CallToAction
					button-text="Create new account"
					:no-background="true"
					class="w-full max-w-xs rounded-full px-6 py-3 md:py-4"
					@click="redirectToSignUp"
				/>
			</div>
		</main>
	</div>
</template>

<script setup lang="ts">
useHead({
	title: "F1 Blog || Sign In / Sign Up",
});

const redirectToSignIn = () => {
	return navigateTo("/auth/signin");
};
const redirectToSignUp = () => {
	return navigateTo("/auth/signup");
};
</script>

<style scoped lang="scss"></style>
