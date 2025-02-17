<template>
	<div class="input-wrapper relative mb-3 flex flex-col">
		<label :for="props.id" class="font-semibold"
			>{{ props.label }} <span v-if="props.required === true" class="font-bold text-red-600">*</span>
		</label>
		<div class="input-container flex items-end justify-stretch gap-1">
			<span class="w-1/4 text-center">{{ props.countryCode ?? `+0` }}</span>
			<input id="" type="number" name="" class="w-full border-b-2 border-gray-700 outline-none" />
		</div>
	</div>
</template>

<script setup lang="ts">
defineEmits(["optionSelected"]);

const props = defineProps<{
	id: string;
	label: string;
	required: boolean;
	prompt: string;
	countryCode: string;
}>();

const selectedCountry = ref("");

onMounted(async () => {
	selectedCountry.value = "Select your area code";
});
</script>

<style lang="scss" scoped></style>
