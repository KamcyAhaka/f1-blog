<template>
	<button
		class="px-5 py-3 text-sm font-bold uppercase transition-transform active:scale-90"
		:class="props.noBackground ? 'border-2 border-gray-700 text-gray-700' : ''"
	>
		{{ props.buttonText }}
	</button>
</template>

<script setup lang="ts">
const props = defineProps<{
	buttonText: string;
	noBackground?: boolean;
}>();
</script>

<style lang="scss" scoped></style>
