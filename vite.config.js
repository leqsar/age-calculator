import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default {
  base:'/age-calculator/',
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // treat all tags with a dash as custom elements
          isCustomElement: (tag) => tag.includes('-')
        }
      }
    })
  ]
}
