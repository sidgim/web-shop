<script setup lang="ts">
import type { Product } from '@/modules/products/interfaces/product.interface.ts';
import { ShoppingCart } from '@element-plus/icons-vue';

interface Props {
  product: Product;
}

defineProps<Props>();
</script>

<template>
  <el-card shadow="hover" body-style="padding: 10px;">
    <el-image
      :src="product.images[0]"
      :alt="product.title"
      style="width: 100%; height: 250px; object-fit: cover; border-radius: 10px"
    />

    <el-space direction="vertical" style="width: 100%; margin-top: 10px">
      <el-text>{{ product.title }}</el-text>
      <el-text type="info" size="small">{{ product.gender }}</el-text>
    </el-space>

    <el-row justify="space-between" align="middle" style="margin-top: 10px">
      <el-text type="primary" size="large" tag="p">{{ product.price }}</el-text>
      <el-button type="primary" size="small">
        <el-icon><ShoppingCart /></el-icon>
        Add to cart
      </el-button>
    </el-row>
  </el-card>
</template>
