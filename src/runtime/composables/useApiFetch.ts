import type { UseFetchOptions } from '#app'
import { ref, useRuntimeConfig, useCookie } from '#imports'

export async function useApiFetch<T>(
	path: string | (() => string),
	options: UseFetchOptions<T> = {},
) {
	const config = useRuntimeConfig()
	const pending = ref(true)
	const data = ref<T | null>(null)
	const error = ref<unknown>(null)

	const headers: Record<string, string> = {
		Accept: 'application/json',
		referer: config.public.appBase,
		...options.headers ?? {},
	}

	if (
		options.method?.toUpperCase?.()
		&& ['POST', 'PUT', 'DELETE'].includes(options.method.toUpperCase())
	) {
		const token = useCookie('XSRF-TOKEN') // Esto es equivalente a getCookie en Axios, lo pide documentación Laravel Sanctum
		if (token.value) {
			headers['X-XSRF-TOKEN'] = token.value
		}
	}

	// console.log('Ejecutando fetchUser() en:', process.server ? 'Backend' : 'Frontend');
	try {
		data.value = await $fetch(config.public.apiBase + path, {
			credentials: 'include', // Impresincible Para cross-origin
			// watch: false,
			...options,
			headers,
		})
	}
	catch (e) {
		error.value = e as Error
	}
	finally {
		pending.value = false
	}

	return { data, error }
}
