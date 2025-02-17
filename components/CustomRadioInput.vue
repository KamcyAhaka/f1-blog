<template>
	<CustomInput
		:id="props.radio.id"
		:name="props.inputName"
		:label="props.radio.label"
		type="radio"
		:value="props.radio.value"
		@input="$emit('genderSelected', props.radio.value)"
	/>
</template>

<script setup lang="ts">
const props = defineProps<{
	inputName: string;
	radio: {
		id: string;
		label: string;
		value: string;
	};
}>();

defineEmits(["genderSelected"]);
</script>

<style lang="scss" scoped></style>
