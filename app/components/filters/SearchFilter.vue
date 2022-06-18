<template>
  <div class="filter search-filter">
    <span>Search</span>
    <el-input
      v-model="inputValue"
      placeholder="Type name, title, or description"
      clearable
    />
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useFilters } from '@/store/filters.js'

const route = useRoute()
const router = useRouter()
const filters = useFilters()

const inputValue = ref('')
const query = computed(() => filters.searchQuery || '')

const updateQuery = (q) => {
  const parsedQuery = q.length > 0 ? q : undefined
  router.push({
    path: '/',
    query: { ...route.query, search: parsedQuery },
  })
}

onMounted(() => {
  inputValue.value = query.value
})

watch(inputValue, () => {
  if (inputValue.value !== query.value) {
    updateQuery(inputValue.value)
  }
})
</script>
