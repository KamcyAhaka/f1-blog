<template>
	<div class="flex min-h-[50vh] grow flex-col items-center justify-center gap-2 bg-gray-50 px-3 pt-3 md:min-h-0">
		<p class="info-text max-w-xl text-center text-xl">
			<span class="block text-3xl font-bold">Hi there!</span> If an account with the provided email address
			exists, you’ll receive a password reset link shortly. Please check your inbox and spam folder for further
			instructions.
		</p>
	</div>
</template>

<script setup lang="ts">
import type Toast from "~/types/Toast";
import { sendEmailVerification, type AuthError } from "firebase/auth";
import { useUserStore } from "~/stores/user";

const { useToastNotification } = useToast();
const showToast = ref(false);
const toast = reactive<Toast>({
	type: "success",
	text: "",
});

onMounted(async () => {
	const userStore = useUserStore();

	try {
		if (userStore.user!.emailVerified !== true) {
			await sendEmailVerification(userStore.user!);
		} else return navigateTo("/admin/");
	} catch (err) {
		const error = err as AuthError;
		useToastNotification(toast, "error", error.message, showToast);
	}
});
</script>

<style lang="scss" scoped></style>
