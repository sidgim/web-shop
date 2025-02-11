<template>
  <el-overlay class="loading-overlay">
    <div class="loading-container">
      <el-icon class="loading-icon"><Loading /></el-icon>
      <p class="loading-text">{{ message }}</p>
    </div>
  </el-overlay>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { Loading } from '@element-plus/icons-vue';

defineProps({
  message: { type: String, default: 'Cargando...' },
});
</script>

<style scoped>
.loading-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}

.loading-container {
  text-align: center;
  color: white;
  background: rgba(0, 0, 0, 0.8);
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.loading-icon {
  font-size: 50px;
  animation: spin 1s linear infinite;
}

.loading-text {
  margin-top: 10px;
  font-size: 18px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
