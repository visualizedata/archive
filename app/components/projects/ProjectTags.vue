<template>
  <div class="project-tags">
    <button type="button" @click.prevent="goToYear(year)">
      {{ year }}
    </button>
    <button
      v-for="c in category"
      :key="`cat-${c}`"
      type="button"
      @click.prevent="goToCategory(c)"
    >
      {{ c }}
    </button>
    <button
      v-for="(tag, key) in tags"
      :key="`tag-${tag}-${key}`"
      type="button"
      @click.prevent="goToTag(tag)"
    >
      {{ tag }}
    </button>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'

defineProps({
  tags: {
    type: Array,
    default: () => [],
  },
  category: {
    type: Array,
    default: () => [],
  },
  year: {
    type: Number,
    default: 0,
  },
})

const router = useRouter()

const goToCategory = (category) => {
  router.push({
    path: `/`,
    query: {
      categories: category,
    },
  })
  window.scrollTo({
    top: 0,
  })
}

const goToTag = (tag) => {
  console.log('clicked tag')
  router.push({
    path: `/`,
    query: {
      tags: tag,
    },
  })
  window.scrollTo({
    top: 0,
  })
}

const goToYear = (year) => {
  router.push({
    path: `/`,
    query: {
      years: year,
    },
  })
  window.scrollTo({
    top: 0,
  })
}
</script>

<style scoped>
.project-tags {
  @apply flex gap-2;

  button {
    @apply before:content-['#'] font-medium text-gray-700 hover:underline;
  }
}
</style>
