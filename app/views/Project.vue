<template>
  <div class="modal-overlay">
    <div class="modal-close-target" @click="closeModal" />
    <div class="modal-contents">
      <div class="close-button">
        <router-link to="/">
          <CloseIcon />
        </router-link>
      </div>

      <div v-if="project">
        <div class="project-info">
          <h1>{{ project.title }}</h1>
          <h2>{{ project.subtitle }}</h2>
          <h3>By {{ project.author.join(', ') }}</h3>

          <div class="project-info--meta">
            <template
              v-if="project.project_url && project.project_url.length > 0"
            >
              <Button
                as="a"
                :href="project.project_url"
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                <span class="pl-2 pr-1">
                  <GlobeIcon class="w-4 h-4" />
                </span>
                <span class="p-1 pr-3">View Project</span>
              </Button>
            </template>

            <template
              v-if="
                project.project_repo && project.project_repo.length > 0
              "
            >
              <Button
                as="a"
                :href="project.project_repo"
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                <span class="pl-2 pr-1">
                  <GitBranchIcon class="w-4 h-4" />
                </span>
                <span class="p-1 pr-3">View Code</span>
              </Button>
            </template>

            <template
              v-if="
                project.student_url &&
                project.student_url.length > 0 &&
                project.student_url !== project.project_url &&
                project.student_url !== project.project_repo
              "
            >
              <Button
                as="a"
                :href="project.student_url"
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                <span class="pl-2 pr-1">
                  <GlobeIcon class="w-4 h-4" />
                </span>
                <span class="p-1 pr-3">Student's Website</span>
              </Button>
            </template>

            <ShareButtons
              :url="currentPageURL"
              :title="shareTitle"
              :description="project.description"
            />
          </div>
          <div class="pt-6 pb-0">
            <ProjectTags
              :year="project.year"
              :tags="project.tags"
              :category="project.category"
            />
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
          <p v-for="p in project.description.split('\n')" :key="p">
            {{ p }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProjects } from '../store/projects.mjs'

import CloseIcon from '@/assets/icons/close.svg'
import GlobeIcon from '@/assets/icons/globe.svg'
import GitBranchIcon from '@/assets/icons/git-branch.svg'

import Button from '@/components/common/Button.vue'
import ShareButtons from '@/components/common/ShareButtons.vue'
import ProjectTags from '@/components/projects/ProjectTags.vue'

const router = useRouter()
const route = useRoute()
const projects = useProjects()

const slug = route.params.slug
const project = projects.findBySlug(slug)

const currentPageURL = ref(window.location.toString())

const shareTitle = ref(
  `"${project.title}" by ${project.author.join(', ')}`
)

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
  @apply text-2xl font-neue-display-random pb-2 max-w-lg;
}

h2 {
  @apply text-xl font-neue-regular pb-2 leading-normal max-w-lg;
}

h3 {
  @apply text-xl font-sans text-stone-500;
}

p {
  @apply leading-normal max-w-prose;
}

.modal-overlay {
  @apply p-8;
  position: fixed;
  inset: 0;
  overflow: auto;
  background: rgba(0, 0, 0, 0.7);
  z-index: 99;
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
  a {
    position: absolute;

    @apply top-3 right-3;

    @apply inline-flex 
    justify-center 
    rounded-sm
    bg-opacity-20 
    h-10
    w-10
    place-items-center
    text-sm 
    font-medium 
    text-black
    hover:bg-opacity-30 
    focus:outline-none 
    focus-visible:ring-2 
    focus-visible:ring-white
    focus-visible:ring-opacity-75;

    svg {
      width: 2em;
      height: 2em;

      * {
        fill: inherit;
      }

      transform: scale(0.9);
      transition: transform ease 0.3s;

      &:hover {
        transform: scale(1);
      }
    }
  }
}

.project-info {
  @apply px-8 pt-10 pb-6 bg-gray-200;

  &--meta {
    @apply pt-4 flex flex-wrap gap-3;
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

  p {
    @apply max-w-lg leading-relaxed;
  }
}

.project-images {
  @apply space-y-2 p-6 bg-gray-100;
}
</style>
