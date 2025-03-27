import {
	addRouteMiddleware,
	defineNuxtModule,
	createResolver,
	addPlugin,
	addImportsDir,
} from '@nuxt/kit'

export interface ModuleOptions {
	enabled?: boolean
	apiUrl?: string
}

export default defineNuxtModule<ModuleOptions>({
	meta: {
		name: '@intracompany/nuxt-kit',
		configKey: 'nuxtKit',
	},
	defaults: {},
	setup(_options, _nuxt) {
		const { resolve } = createResolver(import.meta.url)

		addPlugin(resolve('./runtime/plugin'))
		addImportsDir(resolve('./runtime/composables'))
		addImportsDir(resolve('./runtime/stores'))

		addRouteMiddleware({
			name: 'auth-global',
			path: resolve('./runtime/middleware/auth.global'), // sin .ts
			global: true,
		})
	},
})
