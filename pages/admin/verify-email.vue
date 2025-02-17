<template>
	<div class="flex min-h-[50vh] grow flex-col items-center justify-center gap-2 bg-gray-50 px-3 pt-3 md:min-h-0">
		<p class="info-text max-w-xl text-center text-xl">
			<span class="block text-3xl font-bold">Hi there!</span> A verification email has being sent to your email.
			Head over there and verify your account to continue.
		</p>
		<Transition name="toast">
			<Toast v-if="showToast" :toast="toast" />
		</Transition>
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
