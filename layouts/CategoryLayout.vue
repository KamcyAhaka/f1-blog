<template>
	<div class="category-layout">
		<PostNavigation :post-category="props.category" />
		<main class="main-content">
			<h1 class="text-3xl text-gray-800">{{ props.category }}</h1>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem delectus non reprehenderit voluptas
				ducimus omnis tempore! Libero corporis facilis consectetur ratione minima. Pariatur at quibusdam quas
				ipsum quia magni harum?
			</p>
		</main>
		<NewsletterSubscription />
	</div>
</template>

<script setup lang="ts">
const props = defineProps<{
	category: string;
}>();
</script>

<style lang="scss" scoped></style>
