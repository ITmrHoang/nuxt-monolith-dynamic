// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
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
