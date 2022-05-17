<template>
  <div>
    <div>
      <router-link to="/">Back</router-link>
    </div>

    <div v-if="project">
      <h1>{{ project.title }}</h1>
      <h2>{{ project.subtitle }}</h2>
      <h3>{{ project.author.join(', ') }}</h3>

      <img :src="project.image" />

      <p>
        {{ project.description }}
      </p>

      <div class="py-2 flex gap-2">
        <el-tag
          v-for="tag in project.tags"
          :key="tag"
          type="info"
          size="large"
          class="text-base"
        >
          {{ tag }}
        </el-tag>
      </div>

      <template v-if="project.video.length > 0">
        <video :src="project.video" controls />
      </template>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useProjects } from '../store/projects'
const route = useRoute()
const projects = useProjects()

const slug = route.params.slug
const project = projects.findBySlug(slug)
</script>

<style scoped>
h1 {
  @apply text-2xl font-neue-display-random;
}

h2 {
  @apply text-xl font-neue-regular;
}

h3 {
  @apply text-lg font-sans text-stone-500;
}

p {
  @apply leading-normal max-w-prose text-justify;
}
</style>
