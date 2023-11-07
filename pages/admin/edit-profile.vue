<template>
  <NuxtLayout name="profile-layout">
    <NuxtLayout
      @handle-submit=""
      name="form-layout"
      formHeader="Edit your Profile"
      ref="form"
      class="min-h-[70vh]"
    >
      <CustomInput
        id="name"
        name="name"
        label="Username"
        type="text"
        required="true"
        v-model="userProfile.username"
      />
      <CustomRadioInput
        container-label="Gender"
        input-name="gender"
        :radios="genderRadios"
      />
      <CustomInput
        id="phone"
        name="phone"
        label="Mobile No."
        type="number"
        placeholder="+123 4567 890"
        required="true"
      />
      <CustomSelect @option-selected="saveSelectedOption">
        <template #options>
          <option
            v-for="country in CountriesList"
            :key="country.iso3"
            :value="country.country"
          >
            {{ country.country }}
          </option>
        </template>
      </CustomSelect>
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
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['user-auth', 'verify-user']
})

import { useUserStore } from '~~/stores/user'
import type Toast from '~/types/Toast';
import type Country from '~/types/Country';

const userStore = useUserStore()

const showToast = ref(false)
const nationality = ref("")

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
    id: "no-specify",
    label: "Don't specify",
    value: "Don't specify",
  },
]

const userProfile = reactive({
  username: "",
  gender: "",
  mobileNumber: "",
  nationality: ""
})

const saveSelectedOption = (option: string) => {
  nationality.value = option
  console.log(nationality.value);
};

const CountriesList: Ref<Country[]> = ref([]);

// (async () => {
//   try {
//     let { data, error } = await useFetch<{ error: boolean, msg: string, data: Country[] }>('https://countriesnow.space/api/v0.1/countries');
// 
//     if (error.value) {
//       useToastNotification(toast, 'error', 'There was an error sending your request!', showToast)
//     }
// 
//     if (data.value) {
//       let countries = data.value.data;
//       CountriesList.value = countries;
//     }
//   } catch (error) {
//     console.log(error);
//   }
// })(); 
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
