<script setup lang="ts">
import type Toast from "~/types/Toast";
import type { AuthError } from "firebase/auth";

type VerificationReturnType = { type: "success"; result: true } | { type: "error"; error: AuthError };

const router = useRouter();
const { $auth } = useNuxtApp();

const { useToastNotification } = useToast();
const { useOobVerification } = useFirebaseAuth();
const showToast = ref(false);
const toast = reactive<Toast>({
	type: "success",
	text: "",
});

const response: Ref<VerificationReturnType | null> = ref(null);

const currentRoute = router.currentRoute.value;
const mode = currentRoute.query.mode as string;
const oobCode = currentRoute.query.oobCode as string;

onMounted(async () => {
	console.log(oobCode);

	try {
		response.value = await useOobVerification(oobCode);

		if (response.value && response.value.type === "error") {
			useToastNotification(toast, "error", response.value.error.message, showToast);
		} else {
			if (!$auth.currentUser) {
				navigateTo("/auth/signin?redirect=/admin/");
			} else {
				if (mode === "verifyEmail") {
					useToastNotification(
						toast,
						"success",
						"Email verified successfully. Redirecting...",
						showToast,
						"/admin/",
					);
				}
				if (mode === "resetPassword") {
					useToastNotification(
						toast,
						"success",
						"Redirecting you to create a new password...",
						showToast,
						"/auth/change-password",
					);
				}
			}
		}
	} catch {
		useToastNotification(toast, "error", "There was an error sending your request!", showToast);
	}
});
</script>

<template>
	<div class="flex min-h-[50vh] grow flex-col items-center justify-center gap-2 bg-gray-50 px-3 pt-3 md:min-h-[60vh]">
		<div v-if="response === null" class="loader flex flex-col items-center text-center">
			<MoonLoader :loading="true" color="#000000" :size="70" size-unit="px" />
			<p class="text-3xl capitalize">Just a second...</p>
		</div>
		<div
			v-if="response && response.type === 'error'"
			class="error-content flex flex-col items-center justify-center gap-5"
		>
			<client-only>
				<font-awesome-icon class="text-9xl text-red-700" :icon="['fas', 'triangle-exclamation']" />
			</client-only>
			<h1 class="info-text max-w-xl text-center text-xl">Uh oh! An error occurred. Let's try that again.</h1>
		</div>
		<template v-if="response && response.type === 'success'">
			<div v-if="mode === 'verifyEmail'" class="flex flex-col items-center justify-center gap-5">
				<client-only>
					<font-awesome-icon class="text-9xl text-green-700" :icon="['fas', 'check']" />
				</client-only>
				<p class="info-text max-w-xl text-center text-xl">
					<span class="block text-3xl font-bold">Yay! 🥳 🎊</span>You have been successfully verified. Where
					would you like to go next?
				</p>
				<div class="btn-container flex flex-col items-center justify-center gap-5 md:flex-row">
					<CallToAction
						button-text="Home"
						class="w-full max-w-xs rounded-full bg-gray-700 px-6 py-3 text-white md:py-4"
						@click="navigateTo('/')"
					/>
					<CallToAction
						button-text="Profile"
						:no-background="true"
						class="w-full max-w-xs rounded-full px-6 py-3 md:py-4"
						@click="navigateTo('/admin/')"
					/>
				</div>
			</div>
			<div v-if="mode === 'resetPassword'" class="flex flex-col items-center justify-center gap-5">
				<client-only>
					<font-awesome-icon class="text-9xl text-green-700" :icon="['fas', 'check']" />
				</client-only>
				<p class="info-text max-w-xl text-center text-xl">
					Please hold on, you'll be redirected to create a new password shortly.
				</p>
			</div>
		</template>

		<Transition name="toast">
			<Toast v-if="showToast" :toast="toast" />
		</Transition>
	</div>
</template>

<style lang="scss" scoped></style>
