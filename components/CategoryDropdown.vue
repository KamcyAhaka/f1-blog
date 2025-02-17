<template>
	<ul
		class="category-dropdown absolute right-0 top-6 flex w-[200px] flex-col justify-center gap-3 rounded-lg bg-gray-700 text-white shadow-xl"
	>
		<li
			v-for="(category, index) in props.categories"
			:key="index"
			class="flex items-center justify-center border-b-2 font-normal"
		>
			<button class="w-full px-3 py-2 text-left text-sm">{{ category }}</button>
		</li>
	</ul>
</template>

<script setup lang="ts">
const props = defineProps<{
	categories: string[];
}>();
</script>

<style lang="scss" scoped></style>
