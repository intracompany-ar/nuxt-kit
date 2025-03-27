import type { RouteLocationNormalized } from 'vue-router'
import { defineNuxtRouteMiddleware, useRuntimeConfig, navigateTo, useAuth } from '#imports'

export default defineNuxtRouteMiddleware(async (_to: RouteLocationNormalized) => {
	// https://nuxt.com/docs/guide/directory-structure/middleware#when-middleware-runs
	if (import.meta.server) return

	let auth
	try {
		auth = useAuth()
		console.log('[Middleware2] auth.global ejecutado', auth)
	}
	catch (err) {
		console.error('[Middleware] error al usar useAuth:', err)
		return
	}

	if (!auth.getUser?.value && !auth.isLoading?.value) {
		console.log('[Middleware3] error al usar useAuth:')
		await auth.fetchUser()
	}

	if (!auth.isLoggedIn) {
		const message = auth.fetchErrorMessage?.value ?? 'No está logueado'
		console.log('🔐 Redirecting to login...', message)
		return navigateTo(`${useRuntimeConfig().public.redirectAuth}&message=${encodeURIComponent(message)}`, { external: true })
	}
})
