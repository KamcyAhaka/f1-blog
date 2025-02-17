<template>
	<section
		class="newsletter-section mx-auto my-10 flex min-h-[30vh] w-full max-w-5xl flex-col justify-center gap-3 bg-gray-200 px-4 py-10 md:min-h-[25vh] lg:min-h-[35vh] lg:rounded-3xl"
	>
		<h2 class="text-center text-2xl font-bold text-gray-900">Subscribe to our Newsletter</h2>
		<p class="max-w-md self-center text-center text-xs text-gray-600">
			Get the latest team news, paddock gossip and race week gists in and around F1 delivered right to your inbox.
		</p>
		<div class="input-container flex flex-col items-center gap-2 md:flex-row md:justify-center">
			<input
				type="email"
				placeholder="Enter your email..."
				class="w-4/5 max-w-sm border-2 border-gray-400 px-3 py-2"
			/>
			<CallToAction button-text="Subscribe" class="rounded-lg bg-gray-700 text-white shadow-md" />
		</div>
	</section>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
input {
	outline: none;
}
</style>
