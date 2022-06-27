<template>
  <el-menu
    :default-active="activeIndex"
    router
    class="navigation"
    mode="horizontal"
    active-text-color="#ff0000"
    background-color="#ffffff"
    text-color="#666666"
  >
    <TNSLogo style="width: 3.75em; height: 3.75em" />
    <el-menu-item index="/"> Projects </el-menu-item>
    <el-sub-menu index="/keynotes">
      <template #title>Keynotes</template>
      <el-menu-item
        v-for="(path, index) in keynotes.paths"
        :key="path + index"
        :index="path.path"
      >
        {{ path.label }}
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import TNSLogo from '@/assets/logos/tns-logo.svg'
import { useKeynotes } from '@/store/keynotes'

const keynotes = useKeynotes()
</script>

<style scoped>
.navigation {
  @apply sticky top-0;
}
</style>
