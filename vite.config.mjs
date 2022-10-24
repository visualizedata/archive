import path from 'path'
import { fileURLToPath } from 'url'
import { defineConfig, splitVendorChunkPlugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import svg from 'vite-svg-loader'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/** @type { import('vite').UserConfigExport } */
export default defineConfig({
  root: path.resolve(__dirname, 'app'),
  base: './',
  server: {
    port: 8080,
  },
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    sourcemap: true,
    target: 'es2020',
  },
  plugins: [
    // provides support for reading `.vue` files
    vue(),
    // turns `.svg` files into Vue components
    svg({
      svgoConfig: {
        plugins: [
          {
            name: 'removeViewBox',
            active: false,
          },
        ],
      },
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    splitVendorChunkPlugin(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './app'),
      '~': path.resolve(__dirname, './app'),
    },
  },
})
