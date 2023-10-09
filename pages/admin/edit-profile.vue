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
      />
      <div class="gender-input-container-wrapper flex flex-col gap-1 py-2">
        <p class="">Gender</p>
        <div class="gender-input-container-wrapper flex items-start gap-2">
          <CustomInput
            id="male"
            name="gender"
            label="Male"
            inputID="Male"
            type="radio"
            value="Male"
          />
          <CustomInput
            id="female"
            name="gender"
            label="Female"
            inputID="Female"
            type="radio"
            value="Female"
          />
          <CustomInput
            id="no-specify"
            name="gender"
            label="Don't specify"
            inputID="no-specify"
            type="radio"
            value="no-specify"
          />
        </div>
      </div>
      <CustomInput
        id="phone"
        name="phone"
        label="Mobile No."
        type="number"
        placeholder="+123 4567 890"
        required="true"
      />
      <!-- <CustomSelect @option-selected="saveSelectedOption">
          <template #options>
            <option
              v-for="country in CountriesList"
              :key="country.iso3"
              :value="country.country"
            >
              {{ country.country }}
            </option>
          </template>
        </CustomSelect> -->
      <CallToAction
        type="submit"
        button-text="Edit Profile"
        :colored="true"
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
import type ToastType from '~/types/Toast';

const userStore = useUserStore()

const showToast = ref(false)

const { useToastNotification } = useToast()

const toast = reactive<ToastType>({
  type: 'success',
  text: ''
})

/* const handleSubmit = async (event: Event) => {
    // @ts-ignore
  const formData = new FormData(event.target)

  const userID = userStore.user?._id

  try {
    const {data, error} = await useFetch(`http://localhost:1337/api/users/:${userID}`, {
      method: 'PUT',
      body: formData,
      credentials: 'include'
    })

    if (error && error.value?.statusCode === 401 ) {
      useToastNotification(toast, 'error', 'Invalid email or password', showToast)
      return
    }

    if (error && error.value?.statusCode === 403 ) {
      useToastNotification(toast, 'error', 'There was a problem authenticating your request!', showToast)
      return
    }

    await userStore.getCurrentUser()

    const userData = await $fetch('http://localhost:1337/api/me', {
        method: 'POST',
        credentials: 'include',
      });

      console.log(userData);

    useToastNotification(toast, 'success', 'Login successful', showToast, '/profile/')

  } catch (error) {
    useToastNotification(toast, 'error', 'There was an error sending your request!', showToast)
  }
}; */

// const saveSelectedOption = (option) => (nationality.value = option);

const CountriesList = ref([]);

// (async () => {
//   try {
//     let { data } = await useFetch('https://countriesnow.space/api/v0.1/countries');
//     let countries = data.value.data;
//     CountriesList.value = countries;
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
