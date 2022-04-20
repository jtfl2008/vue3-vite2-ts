import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'
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
export default defineConfig(({ mode }) => {
  // const env = loadEnv(mode, process.cwd())
  return {
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
    server: {
      host: '0.0.0.0',
      proxy: {
        // 选项写法
        '/api': {
          target: 'http://localhost:4000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    build: {
      // terserOptions: {
      //   compress: {
      //     drop_debugger: true,
      //     drop_console: true,
      //   },
      // },
      rollupOptions: {
        external: [],
        output: {
          chunkFileNames: `static/js/[name]-[hash].js`,
          entryFileNames: `static/js/[name]-[hash].js`,
          assetFileNames: `static/[ext]/[name]-[hash].[ext]`,
          manualChunks(id: any) {
            if (id.includes('node_modules')) {
              return 'vendor'
            }
          },
        },
      },
    },
    optimizeDeps: {
      include: ['vue', 'vue-router', 'pinia', 'element-plus'],
    },
  }
})
