import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
<<<<<<< HEAD
import eslint from '@nabla/vite-plugin-eslint'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), eslint()],
=======

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
>>>>>>> c0a64c83aee6dd6363c32cb780aae9bc3415dcce
  resolve: {
    alias: {
      // 配置 @ 为 src 目录的别名
      '@': path.resolve(__dirname, './src')
    }
  }
});