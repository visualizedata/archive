<template>
  <div v-if="projects.length < 1" class="text-center">
    <el-empty description="No Projects Found">
      <el-button type="primary" class="btn" @click="() => reset()">
        Reset Filters
      </el-button>
    </el-empty>
  </div>
  <div v-else class="projects">
    <ProjectCard
      v-for="(project, index) in projects"
      :key="String(project.slug) + String(project.title) + String(index)"
      :title="project.title"
      :year="project.year"
      :author="project.author.join(', ')"
      :description="project.description"
      :slug="project.slug"
      :imageUrl="project.image[0]"
      :category="project.category"
      :tags="project.tags"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import ProjectCard from '@/components/projects/ProjectCard.vue'
import { useProjects } from '@/store/projects.mjs'
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
  @apply grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-4 pt-4;
}

.btn {
  @apply text-tns-red border-tns-red hover:bg-tns-red hover:text-tns-red hover:border-tns-red !bg-transparent;
}
</style>
