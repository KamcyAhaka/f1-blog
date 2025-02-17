<script setup lang="ts">
import { useUserStore } from "~/stores/user";

onMounted(() => useUserStore().watchUser());
</script>

<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>

<style lang="scss">
.toast-enter-active {
	animation: wobble 0.5s ease;
}

/* leave transitions */
.toast-leave-to,
.toast-enter-from {
	opacity: 0;
}

.toast-leave-active {
	transition: all 0.3s ease;
}

.alert-enter-active {
	animation: appear 1s ease;
	transition:
		opacity 0.5s ease,
		transform 0.3s ease;
}

/* leave transitions */
.alert-leave-to,
.alert-enter-from {
	opacity: 0;
}

.alert-leave-active {
	transition:
		opacity 0.5s ease,
		transform 0.3s ease;
}

@keyframes appear {
	0% {
		opacity: 0;
		transform: translateX(100%);
	}

	100% {
		opacity: 1;
		transform: translateX(0%);
	}
}

@keyframes wobble {
	0% {
		opacity: 0;
		transform: translateY(-100%);
	}

	50% {
		transform: translateY(0px);
		opacity: 1;
	}

	60% {
		transform: translateX(8px);
		opacity: 1;
	}

	70% {
		transform: translateX(-8px);
		opacity: 1;
	}

	80% {
		transform: translateX(4px);
		opacity: 1;
	}

	90% {
		transform: translateX(-4px);
		opacity: 1;
	}

	100% {
		transform: translateX(0px);
		opacity: 1;
		transform: translateY(0);
	}
}
</style>
