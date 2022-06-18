<template>
  <el-card class="project" :body-style="{ padding: '0px' }">
    <img src="#" />
    <div class="project-header">
      <a :href="url" target="_blank" rel="noopener noreferrer">
        <div
          :class="{
            'project-header__title': true,
            'project-header__title--size': title.length > 50,
          }"
        >
          {{ title }}
        </div>
        <div
          :class="{
            'project-header__name': true,
            'project-header__name--size': name.length > 20,
          }"
        >
          {{ name }} <span class="project-header__year">({{ year }})</span>
        </div>
      </a>
      <div
        class="project-header__hover-section__row project-header__hover-section"
      >
        <div class="project-header__hover-section__icons">
          <a :href="repo" target="_blank" rel="noopener noreferrer">
            <img v-if="repo" class="link-icon link-github" />
          </a>
          <img v-if="video" class="link-icon link-video" />
        </div>
        <div class="project-header__hover-section__tags">
          <el-tag
            v-for="tag in tags"
            :key="tag"
            class="tag"
            type="info"
            effect="plain"
            size="small"
          >
            {{ tag }}
          </el-tag>
        </div>
      </div>
      <div
        class="project-header__description-container project-header__hover-section"
      >
        <div class="project-header__description">{{ description }}</div>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'Project',
  props: {
    name: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    image: {
      type: Array,
      default: () => [],
    },
    repo: {
      type: String,
      default: '',
    },
    video: {
      type: String,
      default: '',
    },
    year: {
      type: Number,
      default: 0,
    },
    tags: {
      type: Array,
      default: () => [],
    },
    url: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      observer: null,
    }
  },
  mounted() {},
}
</script>

<style scoped>
.project {
  position: relative;
}
.project-header {
  width: calc(100% - 20px);
  height: 40px;
  position: absolute;
  bottom: 0px;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.7);
  z-index: 1;
  transition: height 0.25s, background-color 0.25s;
}

.project:hover .project-header {
  height: calc(100% - 20px);
  background-color: rgba(255, 255, 255, 0.9);
}

.project-header__toggle {
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;
  visibility: hidden;
  opacity: 0.4;
  transition: transform 0.1s;
  font-size: 18px;
}
.project:hover .project-header__toggle {
  visibility: visible;
}
.project-header__toggle:hover {
  transform: scale(1.1);
}

.project-header__title {
  font-family: 'neue-regular';
  margin: 4px 0px;
  font-size: 0.8em;
  white-space: nowrap;
}
.project-header__title--size {
  font-size: 0.7em;
}

.project-header__name {
  font-family: 'neue-display-wide';
  font-size: 1em;
  white-space: nowrap;
}
.project-header__name--size {
  font-size: 0.85em;
}

.project-header__year {
  font-family: 'neue-regular';
  font-size: 14px;
}

.project img {
  width: 100%;
  display: block;
}

.project-header__hover-section {
  opacity: 0;
  transition: opacity 0.25s;
}
.project:hover .project-header .project-header__hover-section {
  opacity: 1;
}

.project-header__hover-section__row {
  display: flex;
  justify-content: space-between;
}
.project-header__hover-section__icons {
  display: flex;
}

.project-header__description-container {
  overflow: scroll;
  max-height: 90px;
  margin: 5px;
}
.project-header__description {
  height: 100%;
  font-size: 13px;
  text-align: left;
}

img.link-icon {
  margin: 10px;
  width: 20px;
  height: 20px;
  cursor: pointer;
  transition: transform 0.1s;
}
img.link-icon:hover {
  transform: scale(1.1);
}

.project-header__hover-section__tags {
  margin-top: 4px;
}
.project-header__hover-section__tags .tag {
  font-family: 'neue-regular';
  margin: 2px;
}

.el-tag {
  cursor: pointer;
}
.el-tag:hover {
  filter: brightness(1.1);
}
</style>
