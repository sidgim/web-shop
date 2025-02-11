<template>
  <el-menu
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
    :router="true"
  >
    <el-menu-item>
      <img style="width: 40px" src="/favicon.ico" alt="Element logo" />
    </el-menu-item>
    <el-menu-item v-if="!authStore.isAuthenticated" index="/auth/login">Login</el-menu-item>
    <el-menu-item v-if="!authStore.isAuthenticated" index="/auth/register">Register</el-menu-item>
    <el-menu-item v-if="authStore.isAuthenticated" @click="authStore.logout()">Logout</el-menu-item>
    <el-menu-item v-if="authStore.isAdmin" index="/admin">Admin</el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/modules/auth/stores/auth.store.ts';

const authStore = useAuthStore();

const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<style scoped>
.el-menu--horizontal > .el-menu-item:nth-child(1) {
  margin-right: auto;
}
</style>
