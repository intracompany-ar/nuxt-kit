export default defineNuxtConfig({
	pinia: {
		autoImports: ['defineStore', 'storeToRefs'],
	},
	modules: [
		'../src/module.ts',
		'@pinia/nuxt',
	],
	runtimeConfig: {
		// The private keys which are only available server-side
		//   apiSecret: '123',
		// Keys within public are also exposed client-side
		public: {
			appBase: process.env.APP_URL,
			apiBase: process.env.API_URL,
			authBase: process.env.AUTH_URL,
			appId: process.env.APP_ID,
			redirectAuth: `${process.env.AUTH_URL}/login?app_id=${process.env.APP_ID}`,
		},
	},
	compatibilityDate: '2025-03-26',
	nuxtKit: {},
})
