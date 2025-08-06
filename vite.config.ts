import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path';
import tailwindcss from '@tailwindcss/vite'
import config from './config/config'

const env = process.argv[process.argv.length - 1] as keyof typeof config;
console.log('config:::', config[env]);


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '~': resolve(__dirname, '.'),
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
