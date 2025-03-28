import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({server:{
  watch:{
    usePolling:true,

  },

},

  plugins: [
    tailwindcss(),
  ],
})