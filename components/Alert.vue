<template>
	<div
		class="alert-container fixed right-2 top-2 z-50 flex max-w-lg items-center gap-2 rounded-xl border border-amber-300 bg-white py-3 pl-5 shadow-lg"
	>
		<div>
			<client-only>
				<font-awesome-icon
					:icon="['fas', 'triangle-exclamation']"
					class="border-r border-black pr-3 text-7xl text-amber-600"
				/>
			</client-only>
		</div>
		<p>{{ props.text }}</p>
	</div>
</template>

<script setup lang="ts">
const props = defineProps<{
	text: string;
}>();
</script>

<style lang="scss" scoped></style>
