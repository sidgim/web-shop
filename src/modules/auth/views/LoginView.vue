<template>
  <h1 class="text-2xl font-semibold mb-4">Login</h1>
  <form @submit.prevent="onLogin">
    <!-- Username Input -->
    <div class="mb-4">
      <label for="username" class="block text-gray-600">Email</label>
      <input
        v-model="form.email"
        ref="emailInputRef"
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
        ref="passwordInputRef"
        type="password"
        id="password"
        name="password"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off"
      />
    </div>
    <!-- Remember Me Checkbox -->
    <div class="mb-4 flex items-center">
      <input
        v-model="form.rememberMe"
        type="checkbox"
        id="remember"
        name="remember"
        class="text-blue-500"
      />
      <label for="remember" class="text-gray-600 ml-2">Remember Me</label>
    </div>
    <!-- Forgot Password Link -->
    <div class="mb-6 text-blue-500">
      <a href="#" class="hover:underline">Forgot Password?</a>
    </div>
    <!-- Login Button -->
    <button
      type="submit"
      class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
    >
      Login
    </button>
  </form>
  <!-- Sign up  Link -->
  <div class="mt-6 text-blue-500 text-center">
    <RouterLink :to="{ name: 'register' }" class="hover:underline">Sign up Here</RouterLink>
  </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue';
import { useAuthStore } from '@/modules/auth/stores/auth.store.ts';
import { useToast } from 'vue-toastification';

interface LoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

const authStore = useAuthStore();
const emailInputRef = ref<HTMLInputElement | null>(null);
const passwordInputRef = ref<HTMLInputElement | null>(null);
const form = ref<LoginForm>({
  email: '',
  password: '',
  rememberMe: false,
});

const toast = useToast();
/*const myForm = reactive({
  email: '',
  password: '',
  rememberMe: false,
});*/

const onLogin = async () => {
  const { email, password, rememberMe } = form.value;
  if (email === '') {
    emailInputRef.value?.focus();
    return;
  }
  if (password === '' || password.length < 6) {
    passwordInputRef.value?.focus();
    return;
  }

  if (rememberMe) {
    localStorage.setItem('email', email);
  } else {
    localStorage.removeItem('email');
  }
  const ok = await authStore.login(email, password);

  if (ok) return;

  toast.error('Invalid email or password');
};

watchEffect(() => {
  const email = localStorage.getItem('email');
  if (email) {
    form.value.email = email;
    form.value.rememberMe = true;
  }
});
</script>
