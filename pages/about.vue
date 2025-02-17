<template>
	<div>
		<NuxtLayout
			name="ad-layout"
			aside-heading="Recent posts"
			:posts="useLatestPosts()"
			class="px-8 py-10 lg:gap-40 lg:px-24"
		>
			<div class="page-content flex flex-col gap-3 md:basis-2/3">
				<PostNavigation post-category="" />
				<h1 class="text-3xl font-bold text-gray-700">About</h1>
				<img class="about-img aspect-video max-h-[250px] w-full rounded-xl border-2" />
			</div>
		</NuxtLayout>
		<NewsletterSubscription class="max-w-6xl lg:min-h-[40vh]" />
	</div>
</template>

<script setup lang="ts">
const { useLatestPosts } = usePosts();
</script>

<style lang="scss" scoped></style>
