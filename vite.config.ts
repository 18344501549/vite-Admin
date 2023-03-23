import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/front": {
        target: 'http://39.97.218.60/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/front/, ''),
      }
    }
  },
  plugins: [
    vue(),
    // ...
    AutoImport({
      imports: ['vue'], // 自动倒入vue相关函数 ref, reactive
      resolvers: [
        ElementPlusResolver(),
        // 自动导入图标组件
        IconsResolver(),
      ],
      eslintrc: { enabled: true }
    }),
    Components({
      resolvers: [
        ElementPlusResolver(),
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ['ep'],
        }),

      ],
    }),
    Icons({
      autoInstall: true,
    }),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
