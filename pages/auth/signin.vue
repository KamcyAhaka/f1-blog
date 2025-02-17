<template>
	<div>
		<NuxtLayout name="auth-layout">
			<NuxtLayout
				name="form-layout"
				form-header="Sign into your account"
				class="gap-5 md:basis-1/2 lg:basis-1/2"
				@handle-submit="handleSubmit"
			>
				<CustomInput
					id="email"
					v-model="email"
					class="mx-auto"
					name="user-email"
					label="Email"
					type="email"
					required="true"
				/>
				<CustomInput
					id="Password"
					v-model="password"
					class="mx-auto"
					name="user-password"
					label="Password"
					type="password"
					required="true"
				/>
				<NuxtLink class="mx-auto text-right underline" to="/auth/forgot-password">Forgot password?</NuxtLink>
				<CallToAction button-text="Sign in" class="mx-auto rounded-lg bg-gray-800 text-white" />
				<p class="mx-auto text-center">
					Don't have an account? Create one
					<NuxtLink to="/auth/signup" class="text-blue-950 underline">now</NuxtLink>
				</p>
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

<script setup lang="ts">
import type Toast from "~/types/Toast";
import { useUserStore } from "~/stores/user";

useHead({
	title: "The PATH Project || Sign In",
});

const userStore = useUserStore();

const router = useRouter();

const redirectPath = (router.currentRoute.value.query.redirect as string) || "/admin/";

const ScaleLoader = resolveComponent("ScaleLoader");

const { useToastNotification } = useToast();
const { useSignIn } = useFirebaseAuth();
const showToast = ref(false);
const showLoader = ref(false);
const toast = reactive<Toast>({
	type: "success",
	text: "",
});

const email = ref("");
const password = ref("");

const handleSubmit = async () => {
	showLoader.value = true;

	try {
		const response = await useSignIn(email.value, password.value);

		showLoader.value = false;

		if (response.type === "error") {
			return useToastNotification(toast, "error", response.error.message, showToast);
		}

		userStore.user = response.user;

		return useToastNotification(toast, "success", "Login successful! Redirecting...", showToast, redirectPath);
	} catch {
		useToastNotification(toast, "error", "There was an error sending your request!", showToast);
	}
};
</script>

<style lang="scss" scoped></style>
