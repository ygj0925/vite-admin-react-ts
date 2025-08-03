import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': '/src', // 根路径
      '~': '/' // src 路径
    
    }
  },
  css: {
   
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      }
    }
  }
})
