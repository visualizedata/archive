<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-menu-item index="1">Projects</el-menu-item>
    <el-sub-menu index="2">
      <template #title>Keynotes</template>
      <el-menu-item index="2-1">item one</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import TNSLogo from '@/assets/logos/tns-logo.svg'
import { ref } from 'vue'
import { useKeynotes } from '@/store/keynotes'

const keynotes = useKeynotes()

const activeIndex = ref('1')
const activeIndex2 = ref('1')
const handleSelect = (key, keyPath) => {
  console.log(key, keyPath)
}
</script>
