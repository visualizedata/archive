<template>
  <div class="filter search-filter">
    <span>Tags</span>
    <div class="flex">
      <el-select
        v-model="selectedTags"
        class="flex-grow"
        placeholder="Select Tags"
        multiple
        clearable
        @change="onTagChange"
      >
        <el-option
          v-for="([tag, count], index) in tagOptions"
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
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useFilters } from '@/store/filters'

const router = useRouter()
const route = useRoute()
const filters = useFilters()

const selectedTags = computed(() => filters.activeTags || [])

const tagOptions = Object.entries(filters.tags).sort((a, b) => {
  const a_count = a[1]
  const b_count = b[1]

  return b_count > a_count ? 1 : -1
})

const onTagChange = (selectedTags) => {
  const parsedTags =
    selectedTags.length > 0 ? selectedTags.join('|') : undefined

  router.push({
    path: '/',
    query: { ...route.query, tags: parsedTags },
  })
}
</script>
