<template>
	<NuxtLayout name="profile-layout">
		<ul class="profile-actions-list my-6 flex flex-col gap-7 md:w-full md:px-10">
			<NuxtLink to="/admin/edit-profile">
				<li class="profile-action relative cursor-pointer">
					<p class="text-sm font-bold">Edit Profile</p>
					<p class="text-xs font-bold text-gray-400">Update your information</p>
					<client-only>
						<font-awesome-icon
							class="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-400"
							:icon="['fas', 'chevron-right']"
						/>
					</client-only>
				</li>
			</NuxtLink>
			<NuxtLink to="/admin/create-admin">
				<li class="profile-action relative cursor-pointer">
					<p class="text-sm font-bold">Create a New Admin</p>
					<p class="text-xs font-bold text-gray-400">Create a new blog post</p>
					<client-only>
						<font-awesome-icon
							class="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-400"
							:icon="['fas', 'chevron-right']"
						/>
					</client-only>
				</li>
			</NuxtLink>
			<NuxtLink to="/admin/blogs/new">
				<li class="profile-action relative cursor-pointer">
					<p class="text-sm font-bold">Create a New Post</p>
					<p class="text-xs font-bold text-gray-400">Create a new blog post</p>
					<client-only>
						<font-awesome-icon
							class="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-400"
							:icon="['fas', 'chevron-right']"
						/>
					</client-only>
				</li>
			</NuxtLink>
			<NuxtLink to="/posts/">
				<li class="profile-action relative cursor-pointer">
					<p class="text-sm font-bold">View Posts</p>
					<p class="text-xs font-bold text-gray-400">
						{{ totalPostsNumber }} {{ totalPostsNumber > 1 ? "posts" : "post" }}
					</p>
					<client-only>
						<font-awesome-icon
							class="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-400"
							:icon="['fas', 'chevron-right']"
						/>
					</client-only>
				</li>
			</NuxtLink>

			<NuxtLink to="/profile/reviews">
				<li class="profile-action relative cursor-pointer">
					<p class="text-sm font-bold">My reviews</p>
					<p class="text-xs font-bold text-gray-400">Reviewed 4 items</p>
					<client-only>
						<font-awesome-icon
							class="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-400"
							:icon="['fas', 'chevron-right']"
						/>
					</client-only>
				</li>
			</NuxtLink>
			<li class="profile-action relative cursor-pointer" @click="logUserOut">
				<p class="text-sm font-bold">Logout</p>
				<p class="text-xs font-bold text-gray-400">End your session</p>
				<client-only>
					<font-awesome-icon
						class="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-400"
						:icon="['fas', 'chevron-right']"
					/>
				</client-only>
			</li>
		</ul>
		<transition name="toast">
			<Toast v-if="showToast" :toast="toast" text="Logout successful" />
		</transition>
		<transition name="alert">
			<Alert
				v-if="showAlert"
				text="Your account is unverified. Some actions can only be done with a verified account."
			/>
		</transition>
	</NuxtLayout>
</template>

<script setup lang="ts">
import { collection, getCountFromServer } from "firebase/firestore";
import { db } from "~/firebase/index";
import { useUserStore } from "~/stores/user";
import type Toast from "~/types/Toast";

const { useToastNotification } = useToast();
const { useSignOut } = useFirebaseAuth();

const showToast = ref(false);
const showAlert = ref(false);
const totalPostsNumber = ref(0);

const toast = reactive<Toast>({
	type: "warning",
	text: "",
});

const { $auth } = useNuxtApp();

const userStore = useUserStore();

onMounted(async () => {
	const coll = collection(db, "posts");
	const snapshot = await getCountFromServer(coll);
	totalPostsNumber.value = snapshot.data().count;

	if ($auth.currentUser) {
		showAlert.value = !$auth.currentUser.emailVerified;
		console.warn(showAlert.value);
	}

	setTimeout(() => {
		showAlert.value = false;
	}, 3000);
});

const logUserOut = async () => {
	try {
		const response = await useSignOut();

		if (response.type === "success") {
			userStore.user = response.user!;
			useToastNotification(toast, "success", "You have been successfully logged out.", showToast, "/");
		}

		if (response.type === "error") {
			useToastNotification(toast, "error", response.error.message, showToast);
		}
	} catch {
		useToastNotification(toast, "error", "An error occurred. Please try again later.", showToast);
	}
};
</script>

<style lang="scss" scoped></style>
