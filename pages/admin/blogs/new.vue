<template>
  <div class="container pt-5 flex flex-col space-between items-center gap-3 max-w-3xl mx-auto">
    <h1 class="text-2xl font-bold capitalize text-center">Create a new blog post</h1>

    <CustomInput
      label="Post Title"
      type="text"
      id="post-title"
      required="true"
      name="post-title"
      v-model="postTitle"
      class="w-[90%]"
    />

    <h2 class="font-bold text-left capitalize w-[90%]">Content goes here...
      <i class="text-red-700">*</i>
    </h2>
    <span class="content-info text-xs italic font-normal w-[90%] md:text-sm">(Must be a minimum of 200
      characters)</span>
    <TipTap @articleSubmission="savePost" />
  </div>
  <Transition name="toast">
    <Toast
      :toast="toast"
      v-if="showToast"
    />
  </Transition>
  <div
    class="loading-overlay fixed top-0 left-0 w-[100vw] h-[100vh] bg-black opacity-40 flex justify-center items-center"
    v-if="showLoader"
  >
    <component :is="ScaleLoader" />
  </div>
</template>

<script
  setup
  lang="ts"
>
import type Toast from '~/types/Toast';
import { useUserStore } from '~/stores/user';
import type { User } from 'firebase/auth';

definePageMeta({
  middleware: ['user-auth']
})

const ScaleLoader = resolveComponent('ScaleLoader');

const { useToastNotification } = useToast()
const showToast = ref(false)
const showLoader = ref(false);
const toast = reactive<Toast>({
  type: 'success',
  text: ''
})

const userStore = useUserStore()

const postTitle = ref('')
const postContent = ref('')

const validatePost = () => {
  if ((postTitle.value.length < 5) && (postContent.value.length < 2000)) {
    useToastNotification(toast, 'error', 'Posts must have a title of at least 5 characters and a content of 200 characters or more.', showToast)
    return false
  } else return true
}


const savePost = async (document: string) => {
  postContent.value = document

  if (validatePost()) {

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
  }

  return
};
</script>
