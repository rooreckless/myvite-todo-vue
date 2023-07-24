import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  //以下のserverを追加
  server: {
    host: true,
    watch: {
      usePolling: true
    }
  },
})
