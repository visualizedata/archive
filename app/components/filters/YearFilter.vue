<template>
  <div class="filter search-filter">
    <div class="label">Search projects</div>

    <el-select
      v-model="selectedYears"
      placeholder="Type name, title, or description"
      multiple
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

const selectedYears = computed(() => filters.activeYears)

const options = Object.entries(filters.years).sort((a, b) => {
  const a_value = a[0]
  const b_value = b[0]

  return b_value > a_value ? 1 : -1
})

const onTagChange = (selectedYears) => {
  const parsedYears =
    selectedYears.length > 0 ? selectedYears.join('|') : undefined

  router.push({
    path: '/',
    query: { ...route.query, years: parsedYears },
  })
}
</script>
