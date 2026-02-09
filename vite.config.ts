import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // 프론트엔드에서 /api로 시작하는 요청을 백엔드 8084 포트로 보냅니다.
      '/api': {
        target: 'http://localhost:8084',
        changeOrigin: true,
        // 필요하다면 /api를 제거하고 전달 (백엔드 URL 구조에 따라 결정)
        // rewrite: (path) => path.replace(/^\/api/, '') 
      }
    }
  }
})
