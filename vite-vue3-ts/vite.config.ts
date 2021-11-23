import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

const resolve = (dir: string) => path.join(__dirname, dir)
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 设置启动Network 为本地ip
  // 参考：https://cn.vitejs.dev/config/#server-options
  server: {
    host: '0.0.0.0',
    open: true, // 服务启动时是否自动打开浏览器
    cors: true // 允许跨域
  },
  // 设置别名
  resolve: {
    alias: {
      '@': resolve('src'),
      comps: resolve('src/components'),
      apis: resolve('src/apis'),
      views: resolve('src/views'),
      utils: resolve('src/utils'),
      routes: resolve('src/routes')
    }
  },
  base: './' // 打包路径
})
