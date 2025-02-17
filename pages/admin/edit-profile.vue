<template>
	<NuxtLayout name="profile-layout">
		<NuxtLayout
			name="form-layout"
			form-header="Edit your Profile"
			class="min-h-[70vh]"
			@handle-submit="updateProfile"
		>
			<CustomFileInput
				id="photoUrl"
				type="file"
				name="photoUrl"
				label="Display picture"
				placeholder=""
				required="true"
				accept="image/*"
				@input="validateFile"
			/>
			<CustomInput
				id="name"
				v-model="profileData.username as string"
				name="name"
				label="Username"
				type="text"
				required="true"
			/>

			<CustomInput
				id="phone"
				v-model="profileData.mobileNumber as string"
				name="phone"
				label="Mobile No."
				type="number"
				placeholder="+123 4567 890"
				required="true"
			/>

			<fieldset class="gender-input-container flex flex-col gap-1 py-2">
				<legend>Please select your gender</legend>

				<div class="gender-input-container flex gap-2">
					<CustomRadioInput
						v-for="radio in genderRadios"
						:key="radio.id"
						:radio="radio"
						input-name="gender"
						@gender-selected="getSelectedGender"
					/>
				</div>
			</fieldset>

			<CallToAction button-text="Edit Profile" class="rounded-lg bg-gray-800 text-white" />
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

<script setup lang="ts">
import { reload } from "firebase/auth";
// import ImageKit from "imagekit-javascript";

import { useUserStore } from "~~/stores/user";
import type Toast from "~/types/Toast";
import type Country from "~/types/Country";

const { $auth } = useNuxtApp();

definePageMeta({
	// middleware: ["verify-user"],
});

type ProfileData = {
	username: string | null;
	gender: string | null;
	mobileNumber: string | null;
	dialCode: string | null;
	nationality: string | null;
	displayPhoto: File | null;
};

// const imagekit = new ImageKit({
// 	publicKey: "public_qzVYQ7/ZYx7q5SPAXQuGBI5I7j4=",
// 	urlEndpoint: "https://ik.imagekit.io/chyktg5pia/f1-blog",
// 	// @ts-ignore
// 	authenticationEndpoint: "/api/signature",
// });

const userStore = useUserStore();

const ScaleLoader = resolveComponent("ScaleLoader");
const showLoader = ref(false);

const showToast = ref(false);

const CountriesList: Ref<Country[]> = ref([]);

const { useToastNotification } = useToast();
const { useTokenRetrieval, useProfileUpdate } = useFirebaseAuth();
const { useFileUpload } = useFirebaseStorage();

const toast = reactive<Toast>({
	type: "success",
	text: "",
});

const genderRadios = [
	{
		id: "male",
		label: "Male",
		value: "Male",
	},
	{
		id: "female",
		label: "Female",
		value: "Female",
	},
	{
		id: "others",
		label: "Others",
		value: "Others",
	},
];

const profileData = reactive<ProfileData>({
	username: userStore.user?.displayName || "",
	gender: null,
	mobileNumber: userStore.user?.phoneNumber || "",
	dialCode: null,
	nationality: null,
	displayPhoto: null,
});

async function fetchCountries() {
	try {
		const { data, error } = await useFetch<{ error: boolean; msg: string; data: Country[] }>(
			"https://countriesnow.space/api/v0.1/countries/codes",
		);

		if (error.value) {
			console.error("Error fetching countries:", error.value);
			useToastNotification(toast, "error", "There was an error sending your request!", showToast);
		}

		if (data.value) {
			const countries = data.value.data;
			CountriesList.value = countries;
		}
	} catch (error) {
		console.error("An unexpected error occurred:", error);
	}
}

fetchCountries();

// const getSelectedCountry = (option: string) => {
// 	profileData.nationality = option;
// 	const country = CountriesList.value?.filter((country) => country.name === option);
//
// 	profileData.dialCode = country[0].dial_code;
// };

const getSelectedGender = (option: string) => {
	profileData.gender = option;
};

const validateFile = async (event: Event) => {
	const fileInput = event.target as HTMLInputElement;
	const file = fileInput.files && fileInput.files[0];

	if (file && file.type.includes("image/")) {
		profileData.displayPhoto = file;
	} else {
		useToastNotification(toast, "error", "Only images are allowed as profile pictures", showToast);
		return;
	}
};

const updateProfile = async () => {
	if (profileData.displayPhoto) {
		if ($auth.currentUser) {
			showLoader.value = true;
			try {
				const tokenObject = await useTokenRetrieval();

				if (tokenObject.type === "error") {
					showLoader.value = false;
					return useToastNotification(toast, "error", tokenObject.error.message, showToast);
				}

				if (tokenObject.type === "redirect") {
					showLoader.value = false;
					return navigateTo(tokenObject.url);
				}

				const imageURL = await useFileUpload(
					profileData.displayPhoto,
					userStore.user?.uid as string,
					"images/admin",
				);

				if (imageURL.type === "error") {
					return useToastNotification(toast, "error", imageURL.error.message, showToast);
				}

				await useProfileUpdate($auth.currentUser, {
					username: profileData.username as string,
					photoURL: imageURL.result,
				});

				showLoader.value = false;

				await reload($auth.currentUser);

				useToastNotification(toast, "success", "Profile update successful", showToast, "/admin/");
			} catch (error) {
				console.log(error);
			}
		} else {
			return navigateTo(`/auth/signin?redirect=${encodeURIComponent(useRoute().path)}`);
		}
	} else {
		showLoader.value = false;
		useToastNotification(toast, "error", "Only images are allowed as profile pictures", showToast);
	}
};
</script>

<style lang="scss" scoped>
/* enter transitions */
.toast-enter-active {
	animation: wobble 0.5s ease;
}

/* leave transitions */
.toast-leave-to {
	opacity: 0;
	transform: translateY(-60px);
}

.toast-leave-active {
	transition: all 0.3s ease;
}

@keyframes wobble {
	0% {
		transform: translateY(-100px);
		opacity: 0;
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
	}
}
</style>
