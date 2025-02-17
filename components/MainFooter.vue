<template>
	<footer
		class="main-footer mt-auto grid grid-cols-1 content-center gap-x-4 gap-y-10 bg-gray-100 px-8 py-10 text-xs md:grid-cols-2 md:px-10 lg:grid-cols-4 lg:gap-x-10"
	>
		<div class="footer-bio-container flex flex-col gap-5">
			<h2 class="text-base font-bold">
				<NuxtLink>F1 Blog</NuxtLink>
			</h2>
			<p class="footer-bio text-gray-700">
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime, quas.
			</p>
			<p class="copyright-info text-gray-700">
				&copy; 2023 <NuxtLink class="underline" to="https://kamcyahaka.netlify.app/">KamCy Ahaka</NuxtLink>. All
				Rights Reserved. <NuxtLink class="underline">Terms of Service</NuxtLink> .
				<NuxtLink class="underline">Privacy Policy</NuxtLink>
			</p>
		</div>
		<div class="footer-tag-container flex flex-col gap-5">
			<h2 class="text-base font-bold">Tags</h2>
			<div class="tags-container flex flex-wrap gap-3">
				<NuxtLink
					v-for="(tag, index) in tags"
					:key="index"
					:to="`/categories/${tag}`"
					class="rounded-md bg-white px-3 uppercase text-gray-800"
					>{{ tag }}</NuxtLink
				>
			</div>
		</div>
		<div class="footer-socials-container flex flex-col gap-5">
			<h2 class="text-base font-bold">Socials</h2>
			<div class="socials-container flex flex-col gap-3 text-gray-700">
				<NuxtLink class="flex items-center gap-2">
					<client-only>
						<font-awesome-icon :icon="['fab', 'twitter']" />
					</client-only>
					Twitter
				</NuxtLink>
				<NuxtLink class="flex items-center gap-2">
					<client-only>
						<font-awesome-icon :icon="['fab', 'facebook']" />
					</client-only>
					Facebook
				</NuxtLink>
				<NuxtLink class="flex items-center gap-2">
					<client-only>
						<font-awesome-icon :icon="['fab', 'instagram']" />
					</client-only>
					Instagram
				</NuxtLink>
				<NuxtLink class="flex items-center gap-2">
					<client-only>
						<font-awesome-icon :icon="['fab', 'youtube']" />
					</client-only>
					YouTube
				</NuxtLink>
			</div>
		</div>
		<div class="footer-about-container flex flex-col gap-5">
			<h2 class="text-base font-bold">About</h2>
			<div class="about-content-container flex flex-col gap-3 text-gray-700">
				<NuxtLink>Shop</NuxtLink>
				<NuxtLink>Authors</NuxtLink>
				<NuxtLink>Sitemap</NuxtLink>
				<NuxtLink>About Us</NuxtLink>
				<NuxtLink>Contact</NuxtLink>
			</div>
		</div>
	</footer>
</template>

<script setup lang="ts">
const tags = ["health", "lifestyle", "social", "entertainment", "news", "books", "design", "gadgets"];
</script>

<style lang="scss" scoped></style>
