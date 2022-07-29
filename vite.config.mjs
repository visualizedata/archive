import path from 'path'
import { fileURLToPath } from 'url'
import { defineConfig, splitVendorChunkPlugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import svg from 'vite-svg-loader'

import postcssImport from 'postcss-import'
import tailwindNesting from 'tailwindcss/nesting/index.js'
import tailwindCss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

import tailwindConfig from './tailwind.config.mjs'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const postcssConfig = {
  plugins: [
    postcssImport,
    tailwindNesting,
    tailwindCss(tailwindConfig),
    autoprefixer,
  ],
}

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
  base: './',
  css: {
    postcss: postcssConfig,
  },
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    sourcemap: true,
    target: 'es2020',
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
    splitVendorChunkPlugin(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './app'),
      '~': path.resolve(__dirname, './app'),
    },
  },
})
