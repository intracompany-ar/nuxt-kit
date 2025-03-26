// @ts-check
import { createConfigForNuxt } from '@nuxt/eslint-config/flat'
import stylistic from '@stylistic/eslint-plugin'

// Run `npx @eslint/config-inspector` to inspect the resolved config interactively
export default createConfigForNuxt({
	features: {
		// Rules for module authors
		tooling: true,
		// Rules for formatting
		stylistic: true,
	},
	dirs: {
		src: [
			'./playground',
		],
	},
})
	.append({
		plugins: {
			'@stylistic': stylistic,
		},
		rules: {
			'indent': ['error', 'tab'],
			'@stylistic/indent': ['error', 'tab'],
			'no-tabs': 'off',
			'@stylistic/no-tabs': 'off',
		},
	})
