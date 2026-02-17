import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@interfaces': path.resolve(__dirname, './src/interfaces'),
      '@layouts': path.resolve(__dirname, './src/layouts'),
      '@lib': path.resolve(__dirname, './src/lib'),
      '@modules': path.resolve(__dirname, './src/modules'),
      '@activity-feed': path.resolve(__dirname, './src/modules/activity-feed'),
      '@auth': path.resolve(__dirname, './src/modules/auth'),
      '@automations': path.resolve(__dirname, './src/modules/automations'),
      '@dashboard': path.resolve(__dirname, './src/modules/dashboard'),
      '@integrations': path.resolve(__dirname, './src/modules/integrations'),
      '@repositories': path.resolve(__dirname, './src/modules/repositories'),
      '@settings': path.resolve(__dirname, './src/modules/settings'),
      '@router': path.resolve(__dirname, './src/router'),
    },
  },
})
