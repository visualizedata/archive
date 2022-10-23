<template>
  <div class="relative">
    <Menu as="div" class="relative inline-block text-left">
      <div>
        <MenuButton
          class="inline-flex w-full h-10 place-items-center justify-center rounded-sm bg-tns-red bg-opacity-100 text-sm font-medium text-white hover:bg-opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          <span class="pl-3 pr-1">
            <ShareIcon class="w-4 h-4" />
          </span>
          <span class="p-1 pr-3">Share Project</span>
        </MenuButton>
      </div>

      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <MenuItems
          class="absolute left-0 mt-1 w-64 origin-top-right divide-y divide-gray-100 rounded-sm bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div class="px-1 py-1 grid grid-cols-2">
            <MenuItem
              v-for="(network, key) in networks"
              :key="network + key"
            >
              <share-network
                :network="network"
                :title="title"
                :description="description"
                :url="url"
                :hashtags="hashtags"
                twitter-user="ParsonsDataViz"
                :class="['social-network-button', network]"
              >
                {{ network }}
              </share-network>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import ShareIcon from '@/assets/icons/share.svg'
import { defineProps } from 'vue'

defineProps({
  url: {
    type: String,
    required: true,
    default: 'https://parsons.nyc',
  },
  title: {
    type: String,
    required: true,
    default: 'MS Data Visualization Archive',
  },
  description: {
    type: String,
    required: true,
    default: '',
  },
  hashtags: {
    type: Array,
    required: true,
    default: () => ['dataviz'],
  },
})

const networks = [
  'facebook',
  'twitter',
  'linkedin',
  'reddit',
  'weibo',
  'whatsapp',
  'messenger',
  'line',
  'pocket',
  'pinterest',
  'email',
]
</script>

<style scoped>
.social-network-button {
  @apply w-full 
    flex
     items-center 
     rounded-sm
     px-2 
     py-2 
     text-sm 
     capitalize
  
    hover:text-gray-900
    hover:bg-gray-200;

  --icon-size: 1.2em;
  --icon-repeat: no-repeat;
  --icon-position: 0.5em center;
  --icon-padding: 2.2em;

  &.facebook {
    background-image: url('@/assets/logos/Facebook.png');
    background-size: var(--icon-size);
    background-repeat: var(--icon-repeat);
    background-position: var(--icon-position);
    padding-left: var(--icon-padding);
  }

  &.twitter {
    background-image: url('@/assets/logos/Twitter.png');
    background-size: var(--icon-size);
    background-repeat: var(--icon-repeat);
    background-position: var(--icon-position);
    padding-left: var(--icon-padding);
  }

  &.linkedin {
    background-image: url('@/assets/logos/LinkedIn.png');
    background-size: var(--icon-size);
    background-repeat: var(--icon-repeat);
    background-position: var(--icon-position);
    padding-left: var(--icon-padding);
  }

  &.reddit {
    background-image: url('@/assets/logos/Reddit.png');
    background-size: var(--icon-size);
    background-repeat: var(--icon-repeat);
    background-position: var(--icon-position);
    padding-left: var(--icon-padding);
  }

  &.weibo {
    background-image: url('@/assets/logos/Weibo.png');
    background-size: var(--icon-size);
    background-repeat: var(--icon-repeat);
    background-position: var(--icon-position);
    padding-left: var(--icon-padding);
  }

  &.whatsapp {
    background-image: url('@/assets/logos/WhatsApp.png');
    background-size: var(--icon-size);
    background-repeat: var(--icon-repeat);
    background-position: var(--icon-position);
    padding-left: var(--icon-padding);
  }

  &.line {
    background-image: url('@/assets/logos/Line.png');
    background-size: var(--icon-size);
    background-repeat: var(--icon-repeat);
    background-position: var(--icon-position);
    padding-left: var(--icon-padding);
  }

  &.email {
    background-image: url('@/assets/logos/Gmail.png');
    background-size: var(--icon-size);
    background-repeat: var(--icon-repeat);
    background-position: var(--icon-position);
    padding-left: var(--icon-padding);
  }

  &.messenger {
    background-image: url('@/assets/logos/Messenger.png');
    background-size: var(--icon-size);
    background-repeat: var(--icon-repeat);
    background-position: var(--icon-position);
    padding-left: var(--icon-padding);
  }

  &.pocket {
    background-image: url('@/assets/logos/Pocket.png');
    background-size: var(--icon-size);
    background-repeat: var(--icon-repeat);
    background-position: var(--icon-position);
    padding-left: var(--icon-padding);
  }

  &.pinterest {
    background-image: url('@/assets/logos/Pinterest.png');
    background-size: var(--icon-size);
    background-repeat: var(--icon-repeat);
    background-position: var(--icon-position);
    padding-left: var(--icon-padding);
  }
}
</style>
