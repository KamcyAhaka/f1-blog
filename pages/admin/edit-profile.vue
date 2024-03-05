<template>
  <NuxtLayout name="profile-layout">
    <NuxtLayout
      @handle-submit="updateProfile"
      name="form-layout"
      formHeader="Edit your Profile"
      class="min-h-[70vh]"
    >

      <CustomFileInput
        type="file"
        id="photoUrl"
        name="photoUrl"
        label="Display picture"
        placeholder=""
        required="true"
        accept="image/*"
        @input="validateFile"
      />
      <CustomInput
        id="name"
        name="name"
        label="Username"
        type="text"
        required="true"
        v-model="(userProfile.username as string)"
      />

      <div class="mobile_no-container flex gap-2 items-center mb-5">
        <CustomSelect
          id="country_of_origin"
          label="Country of Origin"
          prompt="Please select your country"
          required="true"
          @option-selected="getSelectedCountry"
          class="w-full"
        >
          <template #options>
            <option
              v-for="country in CountriesList"
              :key="country.code"
              :value="country.name"
            >
              {{ country.name }} ({{ country.dial_code }})
            </option>
          </template>
        </CustomSelect>
      </div>

      <CustomInput
        id="phone"
        name="phone"
        label="Mobile No."
        type="number"
        placeholder="+123 4567 890"
        required="true"
        v-model="(userProfile.mobileNumber as string)"
      />

      <fieldset class="gender-input-container flex flex-col gap-1 py-2">
        <legend>
          Please select your gender
        </legend>

        <div class="gender-input-container flex gap-2">
          <CustomRadioInput
            v-for="radio in genderRadios"
            :radio="radio"
            input-name="gender"
            @gender-selected="getSelectedGender"
          />
        </div>
      </fieldset>

      <CallToAction
        button-text="Edit Profile"
        class="bg-gray-800 rounded-lg text-white"
      />
    </NuxtLayout>
  </NuxtLayout>
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
definePageMeta({
  middleware: ['user-auth', 'verify-user']
})

import type { User } from 'firebase/auth';
import ImageKit from 'imagekit-javascript';

import { useUserStore } from '~~/stores/user'
import type Toast from '~/types/Toast';
import type Country from '~/types/Country';


const imagekit = new ImageKit({
  publicKey: "public_qzVYQ7/ZYx7q5SPAXQuGBI5I7j4=",
  urlEndpoint: "https://ik.imagekit.io/chyktg5pia/f1-blog",
  // @ts-ignore
  authenticationEndpoint: "/api/signature"
});

const userStore = useUserStore()

const ScaleLoader = resolveComponent('ScaleLoader');
const showLoader = ref(false);

const showToast = ref(false)

const { useToastNotification } = useToast()

const toast = reactive<Toast>({
  type: 'success',
  text: ''
})

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
]

const userProfile = reactive({
  username: userStore.user?.displayName,
  gender: "",
  mobileNumber: userStore.user?.phoneNumber,
  dialCode: "0",
  nationality: "",
})

const userPhotoData = reactive<UserPhotoData>({
  error: true,
  photo: null
})

type UserPhotoData = {
  error: boolean
  photo: string | File | null,
  photoType?: string
}

const CountriesList: Ref<Country[]> = ref([]);

const getSelectedCountry = (option: string) => {
  userProfile.nationality = option
  const country = CountriesList.value?.filter(country => country.name === option)

  userProfile.dialCode = country[0].dial_code
};

const getSelectedGender = (option: string) => {
  userProfile.gender = option
};

onMounted(async () => {
  try {
    let { data, error } = await useFetch<{ error: boolean, msg: string, data: Country[] }>('https://countriesnow.space/api/v0.1/countries/codes');

    if (error.value) {
      useToastNotification(toast, 'error', 'There was an error sending your request!', showToast)
    }

    if (data.value) {
      let countries = data.value.data;
      CountriesList.value = countries;
    }
  } catch (error) {
    console.log(error);
  }
})

const validateFile = async (event: Event) => {
  const fileInput = event.target as HTMLInputElement;
  const file = fileInput.files && fileInput.files[0];

  if (file && file.type.includes("image/")) {
    userPhotoData.error = false

    userPhotoData.photo = file
  } else {
    userPhotoData.error = true
    useToastNotification(toast, "error", "Only images are allowed as profile pictures", showToast)
    return
  }
}


const updateProfile = async (eventTarget: HTMLFormElement) => {

  if (userPhotoData.error === false) {
    showLoader.value = true

    try {
      const authenticationParams = await useFetch<{ token: string, expire: string, signature: string }>('/api/signature')

      if (authenticationParams) {
        const uploadAuthParams = authenticationParams.data.value

        const imageURL = await imagekit.upload({
          file: userPhotoData.photo as File,
          fileName: `${userProfile.username}.${userPhotoData.photoType}`,
          signature: uploadAuthParams?.signature as string,
          token: uploadAuthParams?.token as string,
          expire: Number(uploadAuthParams?.expire) as number,
        })

        const { data, error } = await useFetch<{ user: User }>("/api/update-profile", {
          method: "POST",
          body: {
            username: userProfile.username,
            mobileNumber: userProfile.mobileNumber,
            gender: userProfile.gender,
            nationality: userProfile.nationality,
            photoURL: imageURL.url,
            dialCode: userProfile.dialCode
          }
        })

        showLoader.value = false


        if (error.value) {
          useToastNotification(toast, "error", error.value.statusMessage!, showToast)
        }

        if (data.value) {
          userStore.user = data.value.user
          useToastNotification(toast, "success", 'Profile update successful', showToast, '/admin/')
        }
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    showLoader.value = false
    useToastNotification(toast, "error", "Only images are allowed as profile pictures", showToast)
  }

}

</script>

<style
  lang="scss"
  scoped
>
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
