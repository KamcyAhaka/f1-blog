<template>
	<div class="space-between container mx-auto flex w-full flex-col items-center gap-3 pt-5">
		<h1 class="text-center text-2xl font-bold capitalize">Create a new blog post</h1>

		<CustomInput
			id="post-title"
			v-model="postTitle"
			label="Post Title"
			type="text"
			required="true"
			name="post-title"
			class="w-[90%]"
		/>
		<TipTap :model-value="postContent" @article-submission="savePost" />
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

const ScaleLoader = resolveComponent("ScaleLoader");

const { useToastNotification } = useToast();
const showToast = ref(false);
const showLoader = ref(false);
const toast = reactive<Toast>({
	type: "success",
	text: "",
});

const postTitle = ref("");
const postContent = ref("");

const _validatePost = () => {
	if (postTitle.value.length < 5 && postContent.value.length < 2000) {
		useToastNotification(
			toast,
			"error",
			"Posts must have a title of at least 5 characters and a content of 200 characters or more.",
			showToast,
		);
		return false;
	} else return true;
};

const savePost = async (document: string) => {
	postContent.value = document;

	/*   if (validatePost()) {
  
      try {
        showLoader.value = true
        const { data, error } = await useFetch('/api/posts/create', {
          method: 'POST',
          body: {
            postTitle: postTitle.value,
            postContent: postContent.value,
            authorID: userStore.user?.uid
          }
        })
  
        showLoader.value = false
  
        if (error.value) {
          useToastNotification(toast, 'error', error.value.message, showToast)
        }
  
        if (data.value) {
          useToastNotification(toast, 'success', 'Post Created', showToast, '/admin/')
        }
      } catch (error) {
  
      }
    } */

	return;
};
</script>
