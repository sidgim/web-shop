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
    <el-menu-item index="/auth/login">Login</el-menu-item>
    <el-menu-item index="/auth/register">Register</el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<style scoped>
.el-menu--horizontal > .el-menu-item:nth-child(1) {
  margin-right: auto;
}
</style>
