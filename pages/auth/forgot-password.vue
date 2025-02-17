<script setup lang="ts">
import type Toast from "~/types/Toast";
// import { useUserStore } from "~/stores/user";

const ScaleLoader = resolveComponent("ScaleLoader");

const { useToastNotification } = useToast();
const { useSendPasswordReset } = useFirebaseAuth();
const showToast = ref(false);
const showLoader = ref(false);
const toast = reactive<Toast>({
	type: "success",
	text: "",
});

const email = ref("");

async function handleSubmit() {
	showLoader.value = true;

	try {
		const response = await useSendPasswordReset(email.value);

		showLoader.value = false;

		if (response.type === "error") {
			return useToastNotification(toast, "error", response.error.message, showToast);
		}

		return useToastNotification(toast, "success", "Link sent to you email... Redirecting...", showToast);
	} catch {
		useToastNotification(toast, "error", "There was an error sending your request!", showToast);
	}
}
</script>

<template>
	<div>
		<NuxtLayout name="auth-layout">
			<NuxtLayout
				name="form-layout"
				form-header="Retrieve your account"
				class="gap-5 md:basis-1/2 lg:basis-1/2"
				@handle-submit="handleSubmit"
			>
				<p class="mx-auto text-balance text-center text-xs italic md:text-sm">
					Please enter the email associated with your account. If the account exists, we will send a recovery
					link to the email.
				</p>
				<CustomInput
					id="email"
					v-model="email"
					class="mx-auto"
					name="user-email"
					label="Email"
					type="email"
					required="true"
				/>
				<CallToAction button-text="Send recovery link" class="mx-auto rounded-lg bg-gray-800 text-white" />
			</NuxtLayout>
		</NuxtLayout>
		<Transition name="toast">
			<Toast v-if="showToast" :toast="toast" />
		</Transition>
		<div
			v-if="showLoader"
			class="loading-overlay fixed left-0 top-0 flex h-[100vh] w-[100vw] items-center justify-center bg-black opacity-40"
		>
			<component :is="ScaleLoader" />
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
