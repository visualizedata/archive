// ESM module
import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svg from 'vite-svg-loader'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const svgConfig = {
  svgoConfig: {
    plugins: [
      {
        name: 'removeViewBox',
        active: false,
      },
    ],
  },
}

export default defineConfig({
  root: path.resolve(__dirname, 'app'),
  build: {
    outDir: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    vue(),
    svg(svgConfig),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './app'),
    },
  },
})
