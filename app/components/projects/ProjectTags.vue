<template>
  <div class="project-tags">
    <el-tag type="info" size="small" class="text-base">
      {{ year }}
    </el-tag>
    <el-tag
      v-for="c in category"
      :key="c"
      type="info"
      size="small"
      class="text-base"
    >
      {{ c }}
    </el-tag>
    <el-tag
      v-for="tag in tags"
      :key="tag"
      type="info"
      size="small"
      class="text-base"
    >
      {{ tag }}
    </el-tag>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  tags: {
    type: Array,
    default: () => [],
  },
  category: {
    type: Array,
    default: () => [],
  },
  year: {
    type: Number,
    default: 0,
  },
})
</script>

<style scoped>
.project-tags {
  @apply p-2 flex flex-wrap-reverse gap-2;
}
</style>
