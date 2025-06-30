// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  // // Thêm đối tượng 'vite' để cấu hình Vite
  vite: {
    server: {
      watch: {
        // Bật polling ở đây khi cần thiết
        // Điều này có thể hữu ích trong môi trường phát triển với Docker hoặc khi
        // hệ thống tệp không hỗ trợ sự kiện thay đổi tệp (file change events)
        usePolling: true,

        // Tùy chọn: bạn có thể chỉ định chu kỳ kiểm tra (tính bằng milliseconds)
        // Điều này xác định tần suất Vite sẽ kiểm tra các thay đổi
        // Ví dụ: kiểm tra mỗi giây một lần
        interval: 1000, 
      }
    }
  },
  extends: [
    // ['layers/layer-ui', { install: true }]
    // 'github:username/repoName',        // GitHub Remote Source
    // 'github:username/repoName/base',   // GitHub Remote Source within /base directory
    // 'github:username/repoName#dev',    // GitHub Remote Source from dev branch
    // 'github:username/repoName#v1.0.0', // GitHub Remote Source from v1.0.0 tag
    // 'gitlab:username/repoName',        // GitLab Remote Source example
    // 'bitbucket:username/repoName',     // Bitbucket Remote Source example
    // ['github:ITmrHoang/himo-ui', { install: true }]
    ['./layers/himo-ui']
  ],
  devtools: { enabled: true },
  devServer: {
    host: process.env.NUXT_HOST || '0.0.0.0',
    port: parseInt(process.env.NUXT_PORT as string || '3000') // Bạn có thể chỉ định port ở đây nếu muốn
  },
   runtimeConfig: {
    // Các biến trong này chỉ có sẵn ở phía server (server-side)
    // Đây là nơi an toàn để đặt DATABASE_URL nuxt sẽ tự tìm biến mội trường NUXT_DATABASE_URL để điền vào khe cắm
    // use in nuxt outer event handler: const config = useRuntimeConfig(); config.databaseUrl
    databaseUrl: '', // Giá trị mặc định là chuỗi rỗng

    // Các biến trong "public" sẽ có sẵn ở cả server và client (trình duyệt)
    public: {
      // Ví dụ: một biến công khai
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api',
      siteName: process.env.NUXT_PUBLIC_SITE_NAME || 'Himo Nuxt App'
    }
  }
})
