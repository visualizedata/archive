<template>
  <div v-if="projects.length < 1" class="text-center">
    <el-empty description="No Projects Found">
      <el-button type="primary" @click="() => reset()">
        Reset Filters
      </el-button>
    </el-empty>
  </div>
  <div v-else class="projects">
    <ProjectCard
      v-for="project in projects"
      :key="project.id"
      :title="project.title"
      :year="project.year"
      :author="project.author.join(', ')"
      :description="project.description"
      :slug="project.slug"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import ProjectCard from '@/components/ProjectCard.vue'
import { useProjects } from '@/store/projects.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const projectsStore = useProjects()

const projects = computed(() => projectsStore.filteredProjects)

const reset = () => {
  router.push('/')
}
</script>

<style scoped>
.projects {
  @apply grid grid-cols-3 gap-4 pt-4;
}
</style>
