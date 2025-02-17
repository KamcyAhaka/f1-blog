<template>
	<div class="input-container mb-3 flex flex-col gap-2">
		<label :for="props.id" class="font-semibold"
			>{{ props.label }}
			<span v-if="props.required === 'true'" class="font-bold text-red-600">*</span>
		</label>
		<input
			:id="props.id"
			:type="props.type"
			:name="props.name"
			:required="true"
			:accept="props.accepts"
			class=""
			:value="modelValue"
			@input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.files)"
		/>
	</div>
</template>

<script setup lang="ts">
const props = defineProps<{
	label: string;
	type: string;
	id: string;
	name: string;
	modelValue?: string;
	accepts?: string;
	required?: "true" | "false";
	placeholder?: string;
}>();

defineEmits(["update:modelValue"]);
</script>

<style lang="scss" scoped>
input {
	outline: none;
}
</style>
