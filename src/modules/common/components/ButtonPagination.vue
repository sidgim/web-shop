<template>
  <div class="">
    <div>All combined</div>
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30, 40]"
      :size="size"
      :disabled="false"
      :background="background"
      layout="total, sizes, prev, pager, next"
      :total="40"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router';

interface Props {
  hasMoreData: boolean;
}
defineProps<Props>();
import { ref } from 'vue';
import type { ComponentSize } from 'element-plus';
const currentPage = ref(1);
const pageSize = ref(10);
const size = ref<ComponentSize>('large');
const background = ref(false);
const router = useRouter();
const handleSizeChange = (val: number) => {
  router.push({ query: { page: currentPage.value, limit: val } });
};
const handleCurrentChange = (val: number) => {
  router.push({ query: { page: val, limit: pageSize.value } });
};
</script>

<style scoped></style>
