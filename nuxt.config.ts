// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  app: {
    head: {
      title: "Beingmomen DB",
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      meta: [
        {
          name: "description",
          content: "Dashboard",
        },
        {
          name: "keywords",
          content: "Dashboard",
        },
        { name: "author", content: "Abdelmomen Elshatory" },
        { name: "robots", content: "index, follow, max-image-preview:large" },
        { name: "googlebot", content: "index, follow" },
      ],
      link: [
        {
          rel: "icon",
          type: "image/webp",
          href: `${process.env.CLOUDINARY_URL}beingmomen/xhjsrjkz4pfcsworh2mt`,
        },
        {
          rel: "canonical",
          href: "https://beingmomen.com",
        },
      ],
    },
    pageTransition: { name: "page", mode: "out-in" },
  },

  modules: [
    "@nuxt/ui",
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxtjs/cloudinary",
    "nuxt-tiptap-editor",
    "@sidebase/nuxt-auth",
    "@pinia/nuxt",
    "nuxt-seo-utils",
  ],

  auth: {
    globalAppMiddleware: true,
    isEnabled: true,
    disableServerSideAuth: false,
    originEnvKey: "NUXT_BASE_URL",
    baseURL: process.env.BASE_URL,
    provider: {
      type: "local",
      endpoints: {
        signIn: { path: "/users/login", method: "post" },
        signOut: { path: "/logout", method: "post" },
        signUp: { path: "/users/signup", method: "post" },
        getSession: { path: "/users/me", method: "get" },
      },
      token: {
        maxAgeInSeconds: 18000, // 5 hours
        // signInResponseTokenPointer: "/token",
      },
      pages: {
        login: "/authentication/login",
      },
    },
    sessionRefresh: {
      enablePeriodically: false,
      enableOnWindowFocus: false,
    },
  },

  imports: {
    dirs: ["stores/**", "composables/**"],
  },

  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    uploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET,
    apiKey: process.env.CLOUDINARY_API_KEY,
  },

  css: ["~/assets/css/main.css"],

  tiptap: {
    prefix: "Tiptap", //prefix for Tiptap imports, composables not included
    lowlight: {
      theme: "github-dark",
    },
  },

  image: {
    quality: 80,
    format: ["webp"],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      "2xl": 1536,
    },
    domains: ["db.beingmomen.com", "youtube.com", "vimeo.com"],
    alias: {
      "https://db.beingmomen.com": "https://db.beingmomen.com",
      youtube: "youtube.com",
      vimeo: "vimeo.com",
    },
    // provider: "cloudinary",
    cloudinary: {
      baseURL: `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/`,
    },
    modifiers: {
      effect: "sharpen:100",
      quality: "auto:best",
    },
    dir: "assets/images",
  },

  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL,
      images: {
        isImageLocal: process.env.IS_IMAGE_PATH_LOCAL,
        imageLocalPath: process.env.IMAGE_LOCAL_PATH,
      },
      appPublicUrl: process.env.APP_PUBLIC_URL,
      cloudinary: {
        cloudinaryUrl: process.env.CLOUDINARY_URL,
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        uploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET,
        apiKey: process.env.CLOUDINARY_API_KEY,
      },
    },
  },

  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: "2024-11-27",

  devServer: {
    port: 8888,
  },

  build: {
    analyze: true,
  },

  vite: {
    build: {
      cssCodeSplit: true, // Split CSS into chunks
      rollupOptions: {
        output: {
          manualChunks: {
            // Group vendor modules into a separate chunk
            vendor: [],
          },
        },
      },
    },
    // Enable CSS optimization
    css: {
      postcss: {
        plugins: [
          // require('tailwindcss'),
          // require("postcss-import"),
          // require('autoprefixer'),
        ],
      },
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
        },
      },
    },
  },

  sourcemap: {
    server: true,
    client: true,
  },
});
