import { defineNuxtConfig } from 'nuxt3'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
    css: ["@/assets/css/styles.css"],
    build: {
        postcss: {
            postcssOptions: require("./postcss.config.js"),
        },
    },
    publicRuntimeConfig: {
        BASE_URL: process.env.BASE_URL || 'http://localhost:3001/api/v1'
    },
})
