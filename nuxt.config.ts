// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    css: ["~/assets/css/main.css"],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    modules: [
        "nuxt-icon",
        [
            "@nuxtjs/google-fonts",
            {
                families: {
                    Lexend: [400, 500, 600],
                },
            },
        ],
    ],
});
