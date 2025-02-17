<template>
	<div class="toast-container min:max-h-[5vh] fixed top-5 z-50 flex min-h-[3vh] w-full items-center justify-center">
		<div
			class="toast-notification mx-auto flex h-full w-[90%] max-w-3xl overflow-hidden rounded-2xl bg-white shadow-lg"
			:class="
				props.toast.type === 'success'
					? 'border-2 border-green-500'
					: props.toast.type === 'error'
						? 'border-2 border-red-500'
						: props.toast.type === 'warning'
							? 'border-2 border-yellow-500'
							: ''
			"
		>
			<div
				class="toast-notification-icon flex items-center border-r-2 px-5 text-white"
				:class="
					props.toast.type === 'success'
						? 'bg-green-500'
						: props.toast.type === 'error'
							? 'bg-red-500'
							: props.toast.type === 'warning'
								? 'bg-yellow-500'
								: ''
				"
			>
				<ClientOnly>
					<font-awesome-icon
						class="text-xl md:text-3xl"
						:icon="
							props.toast.type === 'success'
								? ['fas', 'check']
								: props.toast.type === 'error'
									? ['fas', 'xmark']
									: props.toast.type === 'warning'
										? ['fas', 'triangle-exclamation']
										: ''
						"
					/>
				</ClientOnly>
			</div>
			<div class="toast-notification-text flex items-center p-3">{{ props.toast.text }}</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type ToastType from "~/types/Toast";

const props = defineProps<{
	toast: ToastType;
}>();
</script>

<style lang="scss" scoped></style>
