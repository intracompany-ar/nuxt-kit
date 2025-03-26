import {
	defineNuxtModule,
	createResolver,
	addPlugin,
	addImportsDir,
} from '@nuxt/kit'

// Module options TypeScript interface definition
export interface ModuleOptions {
	enabled?: boolean
	apiUrl?: string
}

export default defineNuxtModule<ModuleOptions>({
	meta: {
		name: '@intracompany/nuxt-kit',
		configKey: 'nuxt-kit',
	},
	defaults: {},
	setup(_options, _nuxt) {
		const { resolve } = createResolver(import.meta.url)

		// Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
		addPlugin(resolve('./runtime/plugin'))
		_nuxt.hook('imports:dirs', (dirs) => {
			dirs.push(resolve('./runtime/middleware'))
		})
		// addComponentsDir({ path: resolve('./components') })
		addImportsDir(resolve('./composables'))
	},
})
