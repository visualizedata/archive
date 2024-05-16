<template>
  <MaxWidth>
    <SiteHeader />
    <link rel='preload' as='fetch' href='page.video_source_url'>
    <div>
      <div class="keynote-info">
        <h1>{{ page.title }}</h1>
        <h2>{{ parsedDate(page.date) }}</h2>
      </div>

      <!-- eslint-disable-next-line vue/no-v-html -->
      <div class="video-wrapper" v-html="page.video_embed_html" />

      <div class="keynote-description">
        <p>{{ page.description }}</p>
      </div>

      <template v-if="page.students.length > 0">
        <div class="keynote-students">
          <h2>Students</h2>
          <ul>
            <li v-for="student in page.students" :key="student">
              {{ student }}
            </li>
          </ul>
        </div>
      </template>
    </div>
  </MaxWidth>
</template>

<script setup>
import SiteHeader from '@/components/layout/SiteHeader.vue'
import MaxWidth from '@/components/common/MaxWidth.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useKeynotes } from '../store/keynotes.mjs'
const route = useRoute()
const keynotes = useKeynotes()

// parameters defined in @/router/index.js
const selectedYear = computed(() => route.params.year)

const page = computed(() =>
  selectedYear.value ? keynotes.getByYear(selectedYear.value) : undefined
)

const parsedDate = (str) => {
  if (str.length < 1) {
    return ''
  }
  const d = new Date(str)
  return d.toLocaleDateString('en-US', { dateStyle: 'long' })
}
</script>

<style scoped>
h1 {
  @apply text-2xl font-neue-display-random;
}

h2 {
  @apply text-xl font-neue-regular font-bold;
}

h3 {
  @apply text-lg font-sans text-stone-500;
}

p {
  @apply leading-normal max-w-prose text-justify;
}

.video-wrapper {
  position: relative;
  width: 100%;
  height: 0px;
  padding-bottom: calc(9 / 16 * 100%);

  &::v-deep(video),
  &::v-deep(iframe),
  &::v-deep(embed) {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }
}
.keynote-info {
  @apply p-6;
}

.keynote-students {
  @apply max-w-2xl p-6;

  ul {
    @apply flex flex-wrap gap-4 pt-2;

    li {
      @apply block font-medium;
    }
  }
}
</style>
