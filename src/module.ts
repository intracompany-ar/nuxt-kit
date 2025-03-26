import { defineNuxtModule, addPlugin, addComponentsDir, addLayout, addLayoutsDir, addServerMiddleware, addImportsDir } from '@nuxt/kit'

export default defineNuxtModule({
    meta: {
        name: '@intracompany/nuxt-kit',
        configKey: 'kit',
    },
    setup(options, nuxt) {
        addPlugin(resolve('./plugins/auth'))
        addComponentsDir({ path: resolve('./components') })
        addLayoutsDir({ path: resolve('./layouts') })
        addImportsDir(resolve('./composables'))
        nuxt.options.router.middleware.push('auth.global') // si querés auto middleware
    }
})
