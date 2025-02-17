<template>
	<div
		v-if="props.align === 'left' || props.align === undefined"
		class="category-card flex h-full flex-col justify-between gap-2"
	>
		<img
			:src="props.post.imgUrl"
			alt=""
			class="category-card__img aspect-video w-full rounded-lg border-2 object-cover"
		/>
		<span class="category-card__tag--length text-xs">{{ props.post.tag }} . {{ props.post.length }} min read</span>
		<h3 class="category-tag text-sm font-bold">{{ props.post.title }}</h3>
		<p class="category-card__text text-sm text-black/80">{{ props.post.text }}</p>
		<span class="category-card__author--date text-xs">{{ props.post.author }} . {{ props.post.date }}</span>
	</div>
	<div v-if="props.align === 'center'" class="category-card flex h-full max-w-[350px] flex-col gap-2 text-center">
		<img
			:src="props.post.imgUrl"
			alt=""
			class="category-card__img aspect-video w-full rounded-lg border-2 object-cover"
		/>
		<h3 class="category-tag text-sm font-bold">{{ props.post.title }}</h3>
		<span class="post--author--date-length text-xs"
			>{{ props.post.author }} . {{ props.post.date }} . {{ props.post.length }} min read</span
		>
		<p class="category-card__text text-sm">{{ props.post.text }}</p>
	</div>
</template>

<script setup lang="ts">
import type PostHighlight from "~/types/PostHighlight";

const props = defineProps<{
	post: PostHighlight;
	align?: "left" | "center";
}>();
</script>

<style lang="scss" scoped></style>
