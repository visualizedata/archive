<template>
  <div class="project-card" role="button" @click="navigateToProject">
    <div class="project-image" />
    <div class="project-meta">
      <div>{{ year }}</div>
    </div>
    <div class="project-details">
      <h1>{{ title }}</h1>
      <h2>{{ author }}</h2>
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  year: {
    type: Number,
    default: NaN,
  },
  author: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  slug: {
    type: String,
    default: '',
  },
})

const router = useRouter()

const navigateToProject = () => {
  router.push({ path: props.slug })
}
</script>

<style scoped>
.project-card {
  @apply border;
}

.project-image {
  @apply bg-red-500;

  height: 0px;
  padding-bottom: calc(9 / 16 * 100%);
}

.project-details {
  @apply p-2;

  p {
    @apply line-clamp-2;
  }
}

h1 {
  @apply font-neue-regular font-bold;
}
</style>
