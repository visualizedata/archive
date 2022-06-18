<template>
  <MaxWidth>
    <SiteHeader
      description="This interdisciplinary graduate program brings
  together design, statistics, and computer science, developing critical
  abilities and facility for innovation in work settings in which data
  increasingly shapes opinion, policy, and decision-making."
    />
    <main class="flex-grow">
      <ProjectFilters />
      <ProjectsDisplay />
      <router-view />
    </main>
  </MaxWidth>
</template>

<script setup>
import SiteHeader from '@/components/layout/SiteHeader.vue'
import ProjectFilters from '@/components/projects/ProjectFilters.vue'
import ProjectsDisplay from '@/components/projects/ProjectsDisplay.vue'
import MaxWidth from '../components/common/MaxWidth.vue'
</script>
