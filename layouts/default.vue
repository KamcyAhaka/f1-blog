<template>
	<div class="flex min-h-screen flex-col justify-center">
		<MainNavigation />
		<main class="main-content flex grow flex-col">
			<slot />
		</main>
		<MainFooter />
	</div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
