<script setup lang="ts">
import type Toast from "~/types/Toast";
import type Country from "~/types/Country";

import { useUserStore } from "~/stores/user";

useHead({
	title: "The PATH Project || Create Account",
});

const userStore = useUserStore();

const { useToastNotification } = useToast();
const { useSignUp, useTokenRetrieval } = useFirebaseAuth();
const ScaleLoader = resolveComponent("ScaleLoader");
const showLoader = ref(false);
const showToast = ref(false);
const toast = reactive<Toast>({
	type: "success",
	text: "",
});

const profileData = reactive({
	username: "",
	email: "",
	password: "",
	confirmPassword: "",
	nationality: "",
	dialCode: "",
	mobileNumber: "",
});

const CountriesList: Ref<Country[]> = ref([]);

onMounted(async () => {
	try {
		CountriesList.value = await fetchCountries();
	} catch {
		return useToastNotification(
			toast,
			"error",
			"There was a problem loading the country data. Please reload this page. If the issue persists, please contact the tech team",
			showToast,
		);
	}
});

const getSelectedCountry = (option: string) => {
	profileData.nationality = option;
	const country = CountriesList.value?.filter((country) => country.name === option);

	profileData.dialCode = country[0].dial_code;
};

const handleSubmit = async () => {
	if (profileData.confirmPassword !== profileData.password) {
		return useToastNotification(toast, "error", "Passwords must match", showToast);
	}

	showLoader.value = true;

	try {
		const signUpResponse = await useSignUp(profileData.email, profileData.password, profileData.username);

		if (signUpResponse.type === "error") {
			showLoader.value = false;
			return useToastNotification(toast, "error", signUpResponse.error.message, showToast);
		}

		userStore.user = signUpResponse.user;

		const tokenObject = await useTokenRetrieval();

		if (tokenObject.type === "error") {
			showLoader.value = false;
			return useToastNotification(toast, "error", tokenObject.error.message, showToast);
		}

		if (tokenObject.type === "redirect") {
			showLoader.value = false;
			return navigateTo(tokenObject.url);
		}

		await useFetch("/api/admin/create", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${tokenObject.token}`,
			},
			body: {
				id: signUpResponse.user?.uid,
				username: profileData.username,
			},
		});

		showLoader.value = false;
		return useToastNotification(
			toast,
			"success",
			"Account successfully created!",
			showToast,
			"/admin/verify-email",
		);
	} catch {
		useToastNotification(toast, "error", "There was an error sending your request!", showToast);
	}
};
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
				id="Username"
				v-model="profileData.username"
				class="mx-auto"
				name="name"
				label="Username"
				type="text"
				required="true"
			/>
			<CustomInput
				id="email"
				v-model="profileData.email"
				class="mx-auto"
				name="email"
				label="Email"
				type="email"
				required="true"
			/>
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

			<div class="mobile_no-container mx-auto flex items-center gap-2">
				<CustomSelect
					id="country_of_origin"
					label="Country of Origin"
					prompt="Please select your country"
					required="true"
					class="w-full"
					@option-selected="getSelectedCountry"
				>
					<template #options>
						<option v-for="country in CountriesList" :key="country.code" :value="country.name">
							{{ country.name }} ({{ country.dial_code }})
						</option>
					</template>
				</CustomSelect>
			</div>
			<CustomPhoneInput
				id="phoneNumber"
				v-model="profileData.mobileNumber"
				class="mx-auto"
				label="Mobile Number"
				:required="true"
				prompt="Select your area code"
				:country-code="profileData.dialCode"
			/>
			<CallToAction button-text="Create account" class="mx-auto rounded-lg bg-gray-800 text-white" />
			<p class="mx-auto text-center">
				Already have an account? Sign in
				<NuxtLink to="/auth/signin" class="text-blue-950 underline">now</NuxtLink>
			</p>
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
