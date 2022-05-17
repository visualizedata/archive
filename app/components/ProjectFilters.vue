<template>
  <div class="project-filters">
    <SearchFilter />
    <TagFilter />
    <CategoryFilter />
    <YearFilter />
  </div>
</template>

<script setup>
import SearchFilter from './filters/SearchFilter.vue'
import TagFilter from './filters/TagFilter.vue'
import CategoryFilter from './filters/CategoryFilter.vue'
import YearFilter from './filters/YearFilter.vue'
</script>

<style scoped>
.project-filters {
  @apply sticky top-0 py-4 bg-white border-b;
}
</style>
