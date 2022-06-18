<template>
  <div class="modal-overlay">
    <div class="modal-close-target" @click="closeModal" />
    <div class="modal-contents">
      <div class="close-button">
        <router-link to="/"><CloseIcon /></router-link>
      </div>

      <div v-if="project">
        <div class="project-info">
          <h1>{{ project.title }}</h1>
          <h2>{{ project.subtitle }}</h2>
          <h3>
            {{ project.author.join(', ') }}
          </h3>

          <div class="project-info--meta">
            <template
              v-if="project.student_url && project.student_url.length > 0"
            >
              <a
                :href="project.student_url"
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                Student Website
              </a>
            </template>

            <template
              v-if="project.project_url && project.project_url.length > 0"
            >
              <a
                :href="project.project_url"
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                Project Website
              </a>
            </template>

            <template
              v-if="
                project.project_repo && project.project_repo.length > 0
              "
            >
              <a
                :href="project.project_repo"
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                Project Repository
              </a>
            </template>
          </div>
        </div>

        <template v-if="project.video.length > 0">
          <div class="project-video">
            <video :src="importVideo(project.video)" controls autoplay />
          </div>
        </template>

        <template v-if="project.image && project.video.length < 1">
          <div class="project-images">
            <div
              v-for="image in project.image"
              :key="image"
              class="project-image"
            >
              <img :src="importImg(image)" />
            </div>
          </div>
        </template>

        <div class="project-description">
          <p>
            {{ project.description }}
          </p>
        </div>

        <div class="project-tags">
          <h3>Tags</h3>
          <el-tag round type="info" size="large" class="text-base">
            {{ project.year }}
          </el-tag>
          <el-tag
            v-for="category in project.category"
            :key="category"
            round
            type="info"
            size="large"
            class="text-base"
          >
            {{ category }}
          </el-tag>
          <el-tag
            v-for="tag in project.tags"
            :key="tag"
            round
            type="info"
            size="large"
            class="text-base"
          >
            {{ tag }}
          </el-tag>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useProjects } from '../store/projects'

import CloseIcon from '@/assets/icons/close.svg'

const router = useRouter()
const route = useRoute()
const projects = useProjects()

const slug = route.params.slug
const project = projects.findBySlug(slug)

const importImg = (src) => {
  return new URL(`../assets/images/${src}`, import.meta.url).href
}

const importVideo = (src) => {
  const AbsolutePathRegex = new RegExp('^(http|https)://')
  if (AbsolutePathRegex.test(src)) {
    return src
  }
  return new URL(`../assets/media/${src}`, import.meta.url).href
}

const closeModal = () => {
  router.push({ path: '/' })
}
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
  @apply leading-normal max-w-prose;
}

.modal-overlay {
  @apply p-8 z-50;
  position: fixed;
  inset: 0;
  overflow: auto;
  background: rgba(0, 0, 0, 0.7);
}

@keyframes fadeIn {
  from {
    transform: translate(0, 100px);
    opacity: 0;
  }
  to {
    transform: translate(0, 0);
    opacity: 1;
  }
}

.modal-close-target {
  position: fixed;
  inset: 0;
  cursor: pointer;
}

.modal-contents {
  background: rgba(255, 255, 255, 1);
  @apply max-w-3xl m-auto relative;
  animation: fadeIn 0.4s;
}

.close-button {
  position: absolute;
  top: 0;
  right: 0;

  @apply p-4;

  svg {
    width: 2em;
    height: 2em;

    transform: scale(0.9);
    transition: transform ease 0.3s;

    &:hover {
      transform: scale(1);
    }
  }
}

.project-info {
  @apply p-8 pt-10 bg-gray-200;

  &--meta {
    @apply pt-4 flex flex-wrap gap-3;

    a {
      @apply inline-block text-tns-red rounded-full border border-tns-red py-1 px-3 hover:text-white hover:bg-tns-red transition;
    }
  }
}

.project-video {
  @apply p-6 bg-gray-100;

  video {
    @apply rounded;
  }
}

.project-description {
  @apply p-6;
}

.project-images {
  @apply space-y-2 p-6 bg-gray-100;
}

.project-tags {
  @apply p-6 flex gap-2 border-t;
}
</style>
