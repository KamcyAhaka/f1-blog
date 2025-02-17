<template>
	<NuxtLayout name="profile-layout">
		<NuxtLayout name="form-layout" form-header="Create a new admin" class="gap-5 md:basis-1/2 lg:basis-1/2">
			<CustomInput
				id="name"
				v-model="username"
				class="mx-auto"
				name="name"
				label="Username"
				type="text"
				required="true"
			/>
			<CustomInput
				id="email"
				v-model="email"
				class="mx-auto"
				name="name"
				label="Email"
				type="email"
				required="true"
			/>
			<CustomPhoneInput
				id="mobileNumber"
				:required="false"
				prompt="Please select one..."
				class="mx-auto"
				label="Mobile Number"
			/>
			<CallToAction button-text="Create Account" class="self-center bg-gray-600 text-white" />
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
import type Toast from "~/types/Toast";

// const { useToastNotification } = useToast();
const ScaleLoader = resolveComponent("ScaleLoader");
const showLoader = ref(false);
const showToast = ref(false);
const toast = reactive<Toast>({
	type: "success",
	text: "",
});

const username = ref("");
const email = ref("");
</script>

<style lang="scss" scoped></style>
