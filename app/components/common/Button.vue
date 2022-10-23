<template>
  <Component
    :is="componentType"
    class="!inline-flex h-10 place-items-center justify-center rounded-sm bg-tns-red bg-opacity-100 text-sm font-medium !text-white hover:bg-opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
  >
    <slot />
  </Component>
</template>

<script setup>
import { defineProps, ref } from 'vue'

const props = defineProps({ as: { type: String, default: 'button' } })

const componentType = ref(props.as)
</script>
