import { ref } from 'vue'
import { UserApi } from '../controllers/User/user.api'
import { useAuthStore } from '../stores/useAuthStore'

export function useAuth() {
    const isLoading = ref(false)
    const auth = useAuthStore()

    async function login(credentials: { username: string; password: string }) {
        isLoading.value = true
        try {
            const res = await UserApi.login(credentials)
            auth.setLogged(true)
            return res
        } finally {
            isLoading.value = false
        }
    }

    async function logout() {
        isLoading.value = true
        try {
            await UserApi.logout()
            auth.setLogged(false)
        } finally {
            isLoading.value = false
        }
    }

    return { isLoading, login, logout }
}