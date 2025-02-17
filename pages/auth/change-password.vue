<script setup lang="ts">
import type Toast from "~/types/Toast";

useHead({
	title: "The PATH Project || Create Account",
});

const profileData = reactive({
	password: "",
	confirmPassword: "",
});

// const { useToastNotification } = useToast();
// const { useSignUp, useTokenRetrieval } = useFirebaseAuth();
const ScaleLoader = resolveComponent("ScaleLoader");
const showLoader = ref(false);
const showToast = ref(false);
const toast = reactive<Toast>({
	type: "success",
	text: "",
});

async function handleSubmit() {
	// 	if (profileData.confirmPassword !== profileData.password) {
	// 		return useToastNotification(toast, "error", "Passwords must match", showToast);
	// 	}
	//
	// 	showLoader.value = true;
	//
	// 	try {
	// 		const signUpResponse = await useSignUp(profileData.email, profileData.password, profileData.username);
	//
	// 		if (signUpResponse.type === "error") {
	// 			showLoader.value = false;
	// 			return useToastNotification(toast, "error", signUpResponse.error.message, showToast);
	// 		}
	//
	// 		userStore.user = signUpResponse.user;
	//
	// 		const tokenObject = await useTokenRetrieval();
	//
	// 		if (tokenObject.type === "error") {
	// 			showLoader.value = false;
	// 			return useToastNotification(toast, "error", tokenObject.error.message, showToast);
	// 		}
	//
	// 		if (tokenObject.type === "redirect") {
	// 			showLoader.value = false;
	// 			return navigateTo(tokenObject.url);
	// 		}
	//
	// 		await useFetch("/api/admin/create", {
	// 			method: "POST",
	// 			headers: {
	// 				Authorization: `Bearer ${tokenObject.token}`,
	// 			},
	// 			body: {
	// 				id: signUpResponse.user?.uid,
	// 				username: profileData.username,
	// 			},
	// 		});
	//
	// 		showLoader.value = false;
	// 		return useToastNotification(
	// 			toast,
	// 			"success",
	// 			"Account successfully created!",
	// 			showToast,
	// 			"/admin/verify-email",
	// 		);
	// 	} catch {
	// 		useToastNotification(toast, "error", "There was an error sending your request!", showToast);
	// 	}
}
</script>
<template>
	<NuxtLayout name="auth-layout">
		<NuxtLayout
			name="form-layout"
			form-header="Create an account"
			class="gap-5 md:basis-1/2 lg:basis-1/2"
			@handle-submit="handleSubmit"
		>
			<CustomInput
				id="Password"
				v-model="profileData.password"
				class="mx-auto"
				name="password"
				label="Password"
				type="password"
				required="true"
			/>
			<CustomInput
				id="confirm-password"
				v-model="profileData.confirmPassword"
				class="mx-auto"
				name="password-confirmation"
				label="Confirm Password"
				type="password"
				required="true"
			/>
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
	</NuxtLayout>
</template>

<style lang="scss" scoped></style>
