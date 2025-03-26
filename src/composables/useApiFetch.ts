import { ref } from "vue";
import type { UseFetchOptions } from "#app";

export async function useApiFetch<T>(
	path: string | (() => string),
	options: UseFetchOptions<T> = {}
) {
	const config = useRuntimeConfig();

	const headers: Record<string, string> = {
		Accept: "application/json",
		referer: config.public.appBase,
		...options.headers,
	};

	if (
		options.method &&
		["POST", "PUT", "DELETE"].includes(options.method.toUpperCase())
	) {
		const token = useCookie("XSRF-TOKEN"); // Esto es equivalente a getCookie en Axios, lo pide documentación Laravel Sanctum
		if (token.value) {
			headers["X-XSRF-TOKEN"] = token.value;
		}
	}

	const data = ref<T | null>(null);
	const error = ref<Error | null>(null);

	// console.log('Ejecutando fetchUser() en:', process.server ? 'Backend' : 'Frontend');
	try {
		data.value = await $fetch(config.public.apiBase + path, {
			credentials: "include", // Impresincible Para cross-origin
			// watch: false,
			...options,
			headers,
		});
	} catch (e) {
		error.value = e as Error;
	}

	return { data, error };
}
