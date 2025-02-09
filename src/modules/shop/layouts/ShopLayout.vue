<script setup lang="ts">

import TopMenu from '@/modules/shop/components/TopMenu.vue'
import CustomFooter from '@/modules/shop/components/CustomFooter.vue'
</script>

<template>
  <!-- component -->

  <!-- Header Navbar -->
  <top-menu />

  <!-- Router View -->
  <router-view/>

  <!-- Footer -->
<custom-footer/>


</template>

<style scoped>

</style>
