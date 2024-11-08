/* eslint-disable node/prefer-global/process */
import { pwa } from './config/pwa'
import { appDescription } from './constants/index'

export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@vite-pwa/nuxt',
    '@nuxt/eslint',
    '@nuxtjs/supabase',
    'nuxt-swiper',
    '@nuxt/image',
    'nuxt-headlessui',
    '@nuxtjs/seo',
    '@nuxtjs/sitemap',
    '@nuxt/content',
  ],

  routeRules: {
    '/api/**': { cors: true },
  },

  runtimeConfig: {
    public: {
      baseUrl: process.env.NUXT_BASE_URL || 'http://localhost:3000',
      publicUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://imovi.uz',
      supabase: {
        url: process.env.SUPABASE_URL,
        key: process.env.SUPABASE_KEY,
      },
      telegramBot: {
        botToken: process.env.TELEGRAM_BOT_TOKEN,
        chatId: process.env.TELEGRAM_CHAT_ID,
      },
    },
  },

  site: {
    name: 'Imovi',
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://imovi.uz',
  },

  supabase: {
    redirect: false,
    redirectOptions: {
      login: '/',
      callback: '/user/confirm',
    },
  },

  image: {
    domains: ['https://www.imovi.uz'],
  },

  css: [
    '@unocss/reset/tailwind.css',
  ],

  headlessui: {
    prefix: 'Headless',
  },

  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    prerender: {
      crawlLinks: true,
      routes: ['/']
    },
  },

  content: {
    highlight: {
      theme: {
        default: 'vitesse-light',
        dark: 'vitesse-dark',
      },
      langs: ['js', 'ts', 'vue', 'css', 'scss', 'sass', 'html', 'bash', 'md', 'mdc', 'json'],
    },
  },

  experimental: {
    payloadExtraction: false,
    renderJsonPayloads: true,
    typedPages: true,
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      viewport: 'width=device-width,initial-scale=1',
      link: [
        { rel: 'icon', href: '/favicon.svg', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
      meta: [
        { name: 'yandex-verification', content: 'fb62c84b8401ccc7' },
        { name: 'msvalidate.01', content: 'A6021B3DA0391ADB979BB8108FDD4049' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: appDescription },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      ],
      script: [
        {
          src: `https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_ID}`,
          async: true,
        },
        {
          innerHTML: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.GOOGLE_ANALYTICS_ID}');
          `,
          type: 'text/javascript',
        },
        {
          src: 'https://mc.yandex.ru/metrika/tag.js',
          async: true,
        },
        {
          innerHTML: `
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
        
            ym(${process.env.YANDEX_METRIKA_ID}, "init", {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true
            });
          `,
          type: 'text/javascript',
        },
      ],
      noscript: [
        {
          innerHTML: `<div><img src="https://mc.yandex.ru/watch/${process.env.YANDEX_METRIKA_ID}" style="position:absolute; left:-9999px;" alt="" /></div>`,
        },
      ],
    },
  },

  pwa,

  devtools: {
    enabled: true,
  },

  features: {
    // For UnoCSS
    inlineStyles: false,
  },

  eslint: {
    config: {
      standalone: false,
    },
  },
})
