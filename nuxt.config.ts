export default defineNuxtConfig({
  ssr: true,
  target: 'server', 

  runtimeConfig: {
    // Приватные переменные (доступны только на сервере)
    emailUser: process.env.EMAIL_USER,
    emailPass: process.env.EMAIL_PASS,
    emailHost: process.env.EMAIL_HOST,
    emailPort: process.env.EMAIL_PORT,
    emailTo: process.env.EMAIL_TO
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui-pro',
    '@nuxt/content',
    '@compodium/nuxt'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      title: 'Rhino Piano Movers', // default fallback title
      htmlAttrs: {
        lang: 'en'
      }
    }
  },

  colorMode: {
    preference: 'dark', // Устанавливаем тёмную тему по умолчанию
  },

  mdc: {
    highlight: {
      noApiRoute: false
    }
  },

  future: {
    compatibilityVersion: 4
  },

  compatibilityDate: '2025-01-15',

  content: {
    preview: {
      api: 'https://api.nuxt.studio'
    }
  },

  nitro: {
    prerender: {
      routes: [
        '/'
      ]
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  build: {
    analyze: true, // Включает анализатор бандла
    extractCSS: true, // Извлекает CSS в отдельные файлы
    transpile: ['some-external-package'], // Транспиляция внешних пакетов
    optimization: {
      splitChunks: {
        layouts: true, // Оптимизация для layouts
        pages: true, // Оптимизация для страниц
        commons: true // Общие модули
      }
    }
  }
})
