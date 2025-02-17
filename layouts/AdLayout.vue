<template>
	<div class="container flex min-w-full flex-col gap-5 md:flex-row md:gap-10 lg:justify-center">
		<slot />
		<aside
			class="aside flex flex-col gap-5 lg:basis-1/3"
			:class="props.withBg ? 'rounded-lg bg-gray-100 px-5 py-7' : ''"
		>
			<div class="posts-container flex flex-col gap-5 rounded-xl bg-white p-5 shadow-lg">
				<h3 class="font-bold">{{ props.asideHeading }}</h3>
				<PostHighlight v-for="(post, index) in posts" :key="index" :post="post" />
			</div>
			<div class="ad-container aspect-square h-[300px] rounded-lg bg-red-200"></div>
		</aside>
	</div>
</template>

<script setup lang="ts">
import type PostHighlight from "~/types/PostHighlight";

const props = defineProps<{
	asideHeading: string;
	posts: PostHighlight[];
	withBg?: boolean;
}>();
</script>

<style lang="scss" scoped></style>
