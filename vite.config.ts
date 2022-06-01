import { resolve } from 'path'
import { defineConfig } from 'vite'
import type { UserConfig, ConfigEnv } from 'vite'
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
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  // const env = loadEnv(mode, process.cwd())
  const isProduction = mode === 'production'
  const plugins: any[] = [
    [
      vue({
        reactivityTransform: true,
      }),
      vueJsx(),
      vueSetupExtend(),
      PkgConfig(),
      OptimizationPersist(),
      Components({
        dirs: ['src/components'],
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            // enabledCollections: ['ep'],
          }),
        ],
        dts: 'types/components.d.ts',
        extensions: ['vue'],
        directoryAsNamespace: false,
        deep: true,
      }),
      createStyleImportPlugin({
        resolves: [ElementPlusResolve()],
      }),
      AutoImport({
        imports: ['vue', 'vue/macros', 'vue-router', 'pinia'],
        resolvers: [
          ElementPlusResolver({ importStyle: false }),
          IconsResolver({
            // prefix: 'icon',
          }),
        ],
        dts: 'types/auto-imports.d.ts',
        eslintrc: {
          enabled: true,
          filepath: './.eslintrc-auto-import.json',
          globalsPropValue: true,
        },
      }),
      Icons({
        compiler: 'vue3',
        autoInstall: true,
      }),
    ],
  ]
  if (isProduction) {
    plugins.push(
      legacy({
        targets: ['defaults', 'not IE 11'],
      })
    )
  }
  return {
    plugins,
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
          target: '',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_debugger: true,
          drop_console: true,
        },
      },
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
