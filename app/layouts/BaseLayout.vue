<template>
  <SiteNavigation />
  <div class="base-layout--wrapper">
    <SiteHeader />
    <main><slot /></main>
    <SiteFooter />
  </div>
</template>

<script setup>
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import SiteNavigation from '@/components/SiteNavigation.vue'
</script>

<style scoped>
.base-layout--wrapper {
  @apply flex flex-col mx-auto min-h-screen max-w-screen-xl py-8 px-6;

  main {
    @apply flex-grow;
  }
}
</style>
