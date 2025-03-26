// import { useAuth } from '~/stores/useAuth'

// export default defineNuxtRouteMiddleware(async (to, from) => {
//     // https://nuxt.com/docs/guide/directory-structure/middleware#when-middleware-runs
//     if (import.meta.server) return

//     const auth = useAuth()

//     if (!auth.getUser?.value && !auth.isLoading?.value) {
//         await auth.fetchUser()
//     }

//     if (!auth.isLoggedIn) {
//         const message = auth.fetchErrorMessage?.value ?? 'No está logueado'
//         console.log('🔐 Redirecting to login...', message)
//         return navigateTo(useRuntimeConfig().public.authBase + '/login?app_id='+useRuntimeConfig().public.appId+'&message=' + encodeURIComponent(message), { external: true })
//     }
// })