<template>
  <div>
    <ProjectFilters />
    <ProjectsDisplay />
  </div>
</template>

<script setup>
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import ProjectFilters from '@/components/ProjectFilters.vue'
import ProjectsDisplay from '@/components/ProjectsDisplay.vue'
import { useFilters } from '@/store/filters'
const filterStore = useFilters()

const route = useRoute()

const cleanStrArr = (arr) => {
  if (!arr) {
    return []
  }
  return arr.split('|').filter((tag) => tag.length > 0) || []
}

const cleanNumArr = (arr) => {
  if (!arr) {
    return []
  }
  return (
    arr
      .split('|')
      .map((tag) => parseInt(tag))
      .filter((tag) => tag > 0) || []
  )
}

const updateParams = () => {
  const activeTags = cleanStrArr(route.query.tags)
  const activeCategories = cleanStrArr(route.query.categories)
  const activeYears = cleanNumArr(route.query.years)

  filterStore.updateBatch({
    searchQuery: route.query.search || null,
    activeTags,
    activeCategories,
    activeYears,
  })
}

onMounted(() => {
  updateParams()
})

// listen to changes in query parameters
watch(
  () => route.query,
  () => {
    updateParams()
  }
)
</script>
