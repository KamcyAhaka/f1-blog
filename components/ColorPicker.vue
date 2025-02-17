<script setup lang="ts">
const props = defineProps<{
	label: String;
	modelValue: String;
}>();

const emits = defineEmits(["colorChanged", "update:model-value"]);
</script>

<template>
	<input
		type="color"
		class="color-picker"
		:value="modelValue"
		@input="$emit('colorChanged', ($event.target as HTMLInputElement).value)"
	/>
</template>

<style lang="scss" scoped>
label {
	display: flex;
	align-items: center;
}

.color-picker {
	width: 26px;
	height: 5px;
	padding: 0;
	border: none;
	outline: none;
	background: transparent;
	cursor: pointer;
}
</style>
