<template>
	<form
		class="mx-auto flex w-full flex-col justify-center px-8 pb-10 md:basis-2/5 lg:basis-[600px] lg:pt-10"
		@submit.prevent="emitSubmit"
	>
		<h1 class="form-heading self-center text-center text-3xl font-bold capitalize">{{ props.formHeader }}</h1>
		<slot />
	</form>
</template>

<script setup lang="ts">
const props = defineProps<{
	formHeader: string;
}>();

const emits = defineEmits(["handle-submit"]);

const emitSubmit = (event: Event) => {
	emits("handle-submit", event.target);
};
</script>

<style lang="scss">
form > * {
	@apply w-full max-w-md;
}
</style>
