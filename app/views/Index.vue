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
import { defineAsyncComponent } from 'vue'

const SiteHeader = defineAsyncComponent(() =>
  import('@/components/layout/SiteHeader.vue')
)

const ProjectFilters = defineAsyncComponent(() =>
  import('@/components/projects/ProjectFilters.vue')
)

const ProjectsDisplay = defineAsyncComponent(() =>
  import('@/components/projects/ProjectsDisplay.vue')
)

const MaxWidth = defineAsyncComponent(() =>
  import('@/components/common/MaxWidth.vue')
)
</script>
