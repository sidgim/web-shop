<template>
  <h1 class="text-2xl font-semibold mb-4">Register</h1>
  <form @submit.prevent="onRegister">
    <!-- Username Input -->
    <div class="mb-4">
      <label for="name" class="block text-gray-600">Name</label>
      <input
        v-model="form.fullName"
        type="text"
        id="name"
        name="name"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off"
      />
    </div>

    <!-- Username Input -->
    <div class="mb-4">
      <label for="email" class="block text-gray-600">Email</label>
      <input
        v-model="form.email"
        type="text"
        id="email"
        name="email"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off"
      />
    </div>
    <!-- Password Input -->
    <div class="mb-4">
      <label for="password" class="block text-gray-600">Password</label>
      <input
        v-model="form.password"
        type="password"
        id="password"
        name="password"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off"
      />
    </div>
    <!-- Login Button -->
    <button
      type="submit"
      class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
    >
      Create Account
    </button>
  </form>
  <!-- Sign up  Link -->
  <div class="mt-6 text-blue-500 text-center">
    <RouterLink :to="{ name: 'login' }" class="hover:underline">Login Here</RouterLink>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { RegisterForm } from '@/modules/auth/interfaces';
import { useToast } from 'vue-toastification';
import { useAuthStore } from '@/modules/auth/stores/auth.store.ts';

const form = ref<RegisterForm>({
  email: '',
  password: '',
  fullName: '',
});

const authStore = useAuthStore();
const fullNameInputRef = ref<HTMLInputElement | null>(null);
const emailInputRef = ref<HTMLInputElement | null>(null);
const passwordInputRef = ref<HTMLInputElement | null>(null);
const toast = useToast();

const onRegister = async () => {
  if (!validateForm()) {
    return toast.error('Please fill in all fields');
  }
  try {
    const { email, password, fullName } = form.value;
    const { ok, message } = await authStore.register(fullName, email, password);
    if (!ok) {
      return toast.error(message);
    }
    toast.success('Account created successfully');
  } catch (error) {
    console.log(error);
    toast.error('An error occurred. Please try again');
  }
};

const validateForm = (): boolean => {
  if (!form.value.fullName) {
    fullNameInputRef.value?.focus();
    return false;
  }
  if (!form.value.email) {
    emailInputRef.value?.focus();
    return false;
  }

  if (!form.value.password) {
    passwordInputRef.value?.focus();
    return false;
  }
  return true;
};
</script>
