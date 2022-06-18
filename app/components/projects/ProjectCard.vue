<template>
  <div
    class="project-card"
    role="button"
    tabindex="0"
    @click="navigateToProject"
    @keypress="a11yNavigateToProject"
  >
    <div class="project-image">
      <img :id="imageUrl" ref="imagecontainer" />
    </div>
    <div class="project-details">
      <h1>{{ title }}</h1>
      <h2>{{ author }}</h2>
    </div>
    <ProjectTags :tags="tags" :category="category" :year="year" />
  </div>
</template>

<script setup>
import { defineProps, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import ProjectTags from './ProjectTags.vue'

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
  slug: {
    type: String,
    default: '',
  },
  imageUrl: {
    type: String,
    default: '',
  },
  tags: {
    type: Array,
    default: () => [],
  },
  category: {
    type: Array,
    default: () => [],
  },
})

const router = useRouter()

const navigateToProject = (e) => {
  const linkPath = `/project/${props.slug}`

  if (e.metaKey) {
    const absolutePath = router.resolve({ path: linkPath })
    window.open(absolutePath.href, '_blank', 'noopener')
  } else {
    router.push({
      path: `/project/${props.slug}`,
    })
  }
}

const a11yNavigateToProject = (event) => {
  const key = (event.key || '').toUpperCase()

  switch (key) {
    case 'ENTER': {
      // simulate click on enter
      navigateToProject()
      break
    }
    default: {
      break
    }
  }
}

// -----------------------------------------------
// LAZY LOAD COVER IMAGES
// -----------------------------------------------
const imagecontainer = ref()

const importImage = async (src) => {
  // dynamic imports require a file extension
  const extension = src.split('.').pop()
  const path = src.replaceAll(`.${extension}`, '')
  switch (extension) {
    case 'jpg': {
      return await import(`../../assets/images/${path}.jpg`).then(
        (m) => m.default
      )
    }
    case 'jpeg': {
      return await import(`../../assets/images/${path}.jpeg`).then(
        (m) => m.default
      )
    }
    case 'png': {
      return await import(`../../assets/images/${path}.png`).then(
        (m) => m.default
      )
    }
    case 'gif': {
      return await import(`../../assets/images/${path}.gif`).then(
        (m) => m.default
      )
    }
    default: {
      throw new Error('invalid image extensions')
    }
  }
}

const onVisible = (entries, observer) => {
  entries.forEach(async (entry) => {
    const img = entry.target
    const isVisible = entry.intersectionRatio > 0.9
    const hasLoaded = img.getAttribute('data-status') === 'loaded'

    // if image is visible and we have not yet attached an image
    if (isVisible && !hasLoaded) {
      try {
        // try importing image from url and bind to src attribute
        const data = await importImage(props.imageUrl)
        img.src = data
        img.style.background = ''
      } catch (e) {
        // if an error is thrown when importing image, import fallback
        img.src = await import(
          `../../assets/images/__placeholders__/image_not_found.png`
        )
        img.style.background = 'red'
      } finally {
        // after previous blocks, set opacity to 1 and set status to loaded
        // and disconnect observer
        img.style.opacity = '1.0'
        img.setAttribute('data-status', 'loaded')
        observer.disconnect()
      }
    }
  })
}

const observer = new IntersectionObserver(onVisible, {
  root: null, // defaults to viewport
  rootMargin: '0px',
  threshold: 1.0,
})

onMounted(() => {
  observer.observe(imagecontainer.value)
})
</script>

<style scoped>
.project-card {
  @apply border flex flex-col;
}

.project-image {
  @apply bg-gray-50;

  height: 0px;
  padding-bottom: calc(9 / 16 * 100%);

  background-image: url('@/assets/images/__placeholders__/default_placeholder.png');
  background-size: cover;

  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    inset: 0;
    border: 0;
    outline: 0;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
}

.project-details {
  @apply p-2 flex-grow;

  p {
    @apply line-clamp-2;
  }
}

h1 {
  @apply font-neue-regular font-bold;
}
</style>
