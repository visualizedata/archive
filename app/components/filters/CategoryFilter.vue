<template>
  <div class="filter search-filter">
    <div class="label">Categories</div>

    <el-select
      v-model="selectedCategories"
      placeholder="Type name, title, or description"
      clearable
      @change="onTagChange"
    >
      <el-option
        v-for="([tag, count], index) in options"
        :key="tag + count + index"
        :value="tag"
      >
        {{ tag }}
        <span
          :style="{
            fontSize: '0.7rem',
            opacity: 0.5,
          }"
        >
          ({{ count }})
        </span>
      </el-option>
    </el-select>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useFilters } from '@/store/filters'

const router = useRouter()
const route = useRoute()
const filters = useFilters()

const selectedCategories = computed(() => filters.activeCategories)

const options = Object.entries(filters.categories).sort((a, b) => {
  const a_count = a[1]
  const b_count = b[1]

  return b_count > a_count ? 1 : -1
})

const onTagChange = (selectedCategories) => {
  const parsedCategories =
    selectedCategories.length > 0
      ? [selectedCategories].join('|')
      : undefined

  router.push({
    path: '/',
    query: { ...route.query, categories: parsedCategories },
  })
}
</script>
