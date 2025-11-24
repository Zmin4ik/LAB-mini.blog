import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
    const isLoggedIn = ref<boolean>(localStorage.getItem('isLoggedIn') === 'true')

    function setLogged(v: boolean) {
        isLoggedIn.value = v
        localStorage.setItem('isLoggedIn', String(v))
    }

    return { isLoggedIn, setLogged }
})