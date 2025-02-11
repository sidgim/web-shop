<template>
  <RouterView />
  <VueQueryDevtools />
</template>
<script lang="ts" setup>
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import { useAuthStore } from '@/modules/auth/stores/auth.store.ts';
import { AuthStatusEnum } from '@/modules/auth/interfaces';
import { useRoute, useRouter } from 'vue-router';

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();
authStore.$subscribe(
  (_, state) => {
    if (state.authStatus === AuthStatusEnum.Checking) {
      authStore.checkAuthStatus();
      return;
    }
    if (route.path.includes('/auth') && state.authStatus === AuthStatusEnum.Authenticated) {
      router.replace({ name: 'home' });
    }
  },
  { immediate: true },
);
</script>
