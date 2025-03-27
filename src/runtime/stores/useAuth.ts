import { ref, computed, useRuntimeConfig, navigateTo, useApiFetch, defineStore } from '#imports'

export interface User {
	id: number
	name: string
	email: string
}

export const useAuth = defineStore('auth', () => {
	const user = ref<User | null>(null)
	const isLoading = ref<boolean>(false)
	const fetchErrorMessage = ref<string>('')

	const getUser = computed(() => user.value)
	const isLoggedIn = computed(() => !!user.value)

	async function fetchUser() {
		isLoading.value = true
		try {
			const { data, error } = await useApiFetch<User>('/api/user/me')
			if (error.value) throw new Error(error.value.message)

			if (!data) {
				throw new Error('Sesión expirada o token inválido')
			}
			user.value = data.value
		}
		catch (error: unknown) {
			resetStore()
			fetchErrorMessage.value = error instanceof Error ? error.message : 'Ocurrió un error'
		}
		finally {
			isLoading.value = false
		}
	}

	async function logout() {
		await useApiFetch('/logout', { method: 'POST' })
		resetStore()
		const config = useRuntimeConfig()
		return navigateTo(`${config.public.authBase}/login?app_id=${config.public.appId}`)
	}

	function resetStore() {
		user.value = null
		isLoading.value = false
	}

	return {
		user,
		isLoading,
		getUser,
		isLoggedIn, // no usarla como isLoggedIn.value, no se por qué no funciona => usar isLoggedIn sin el value
		fetchUser,
		logout,
		resetStore,
		fetchErrorMessage,
	}
})
