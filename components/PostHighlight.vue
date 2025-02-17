<template>
	<div
		v-if="props.size === 'base' || props.size === undefined"
		class="post-highlight flex max-w-sm gap-4 md:max-w-full"
	>
		<img :src="props.post.imgUrl" alt="" class="post-img aspect-video h-20 rounded-lg border-2" />
		<NuxtLink to="/" class="post-highlight__text-container flex flex-col gap-2">
			<h4 class="text-xs font-bold">{{ props.post.title }}</h4>
			<p class="text-xs text-gray-500">{{ props.post.date }}</p>
		</NuxtLink>
	</div>
	<div
		v-if="props.size === 'lg'"
		class="post-highlight flex max-w-xl flex-col gap-5 rounded-lg bg-white p-5 shadow-md md:max-w-full md:flex-row lg:bg-transparent lg:shadow-none"
	>
		<img
			:src="props.post.imgUrl"
			alt=""
			class="post-img aspect-video min-h-full w-full rounded-lg border-2 object-cover md:aspect-[3/2] md:max-w-xs"
		/>
		<div class="post-highlight__text-container flex flex-col justify-center gap-2 text-xs">
			<p class="text-xs">{{ props.post.tag }} . {{ props.post.length }} min read</p>
			<h4 class="text-balance text-lg font-bold">{{ props.post.title }}</h4>
			<p class="text-balance text-sm md:text-xs">{{ props.post.text }}</p>
			<p>{{ props.post.author }} . {{ props.post.date }}</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import type PostHighlight from "~/types/PostHighlight";

const props = defineProps<{
	post: PostHighlight;
	size?: "base" | "lg";
}>();
</script>

<style lang="scss" scoped></style>
