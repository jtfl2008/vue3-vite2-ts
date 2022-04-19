import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import OptimizationPersist from 'vite-plugin-optimize-persist'
import PkgConfig from 'vite-plugin-package-config'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createStyleImportPlugin, ElementPlusResolve } from 'vite-plugin-style-import'
import AutoImport from 'unplugin-auto-import/vite'
import legacy from '@vitejs/plugin-legacy'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueSetupExtend(),
    PkgConfig(),
    OptimizationPersist(),
    Components({
      dirs: ['src/components'],
      resolvers: [ElementPlusResolver()],
      dts: 'types/components.d.ts',
      extensions: ['vue'],
      directoryAsNamespace: false,
      deep: true,
    }),
    createStyleImportPlugin({
      resolves: [ElementPlusResolve()],
    }),
    AutoImport({
      imports: ['vue', 'vue/macros'],
      resolvers: [ElementPlusResolver({ importStyle: false })],
      dts: 'types/auto-imports.d.ts',
    }),
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
      '@assets': resolve(__dirname, './src/assets'),
    },
  },
})
