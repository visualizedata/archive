<template>
  <div class="project-filters">
    <SearchFilter />
    <TagFilter />
    <CategoryFilter />
    <YearFilter />
  </div>
</template>

<script setup>
import SearchFilter from '@/components/filters/SearchFilter.vue'
import TagFilter from '@/components/filters/TagFilter.vue'
import CategoryFilter from '@/components/filters/CategoryFilter.vue'
import YearFilter from '@/components/filters/YearFilter.vue'
</script>

<style scoped>
.project-filters {
  /* 
    by default
      position:static
    anything larger than a small screen will use 
      position:sticky
  */
  @apply static md:sticky py-4 bg-white border-b z-50 top-28;

  @apply md:grid md:grid-cols-4 md:gap-4;
}
</style>
