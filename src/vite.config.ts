import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // 如果部署到 GitHub Pages，请取消下面 base 的注释并将 repo-name 替换为你的仓库名
  // base: '/repo-name/', 
  // 或者使用相对路径（最通用）
  base: './',
});
