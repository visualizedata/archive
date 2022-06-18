<template>
  <div class="base-layout">
    <SiteNavigation />
    <div class="base-layout--content">
      <div class="base-layout--main">
        <slot />
      </div>
      <SiteFooter />
    </div>
  </div>
</template>

<script setup>
import SiteFooter from '@/components/layout/SiteFooter.vue'
import SiteNavigation from '@/components/layout/SiteNavigation.vue'
</script>

<style scoped>
.base-layout {
  @apply flex flex-col fixed inset-0 overflow-auto min-h-screen;
}
.base-layout--content {
  @apply flex flex-col flex-grow overflow-auto;

  main {
    @apply flex-grow;
  }
}

.base-layout--main {
  @apply flex flex-col flex-grow mx-auto py-8 px-6 w-full;
}
</style>
