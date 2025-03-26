import { defineNuxtRouteMiddleware, navigateTo, useRuntimeConfig } from '#imports'
import type { RouteLocationNormalized } from 'vue-router'

export interface CreateAuthMiddlewareOptions {
    /**
     * Redirección en caso de no estar autenticado
     * (Ej: /login, https://login.miapp.com, etc.)
     */
    redirectTo: string

    /**
     * Mensaje para mostrar en redirección, o función que lo retorne
     */
    getMessage?: () => string

    /**
     * Función para obtener el store de autenticación
     */
    useAuthStore: () => {
        getUser: Ref<object | null>
        isLoggedIn: Ref<boolean>
        isLoading: Ref<boolean>
        fetchUser: () => Promise<void>
        fetchErrorMessage?: Ref<string>
    }
}

export function createAuthMiddleware(opts: CreateAuthMiddlewareOptions) {
    return defineNuxtRouteMiddleware(async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
        if (import.meta.server) return

        const auth = opts.useAuthStore()

        if (!auth.getUser.value && !auth.isLoading.value) {
            await auth.fetchUser()
        }

        if (!auth.isLoggedIn.value) {
            const message =
                (typeof opts.getMessage === 'function' ? opts.getMessage() : null) ??
                auth.fetchErrorMessage?.value ??
                'No autorizado'

            return navigateTo(`${opts.redirectTo}&message=${encodeURIComponent(message)}`, {
                external: true,
            })
        }
    })
}
