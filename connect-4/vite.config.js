import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  // server: {
  //   proxy: {
  //     '/socket.io': {
  //       target: 'http://localhost:3000',
  //       ws: true
  //     },
  //   },
  // },
  resolve: {
    alias: {
    },
  },
});


