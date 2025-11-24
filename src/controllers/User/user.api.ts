import http from '../../api/http'

export const UserApi = {
    async login(credentials: { username: string; password: string }) {
        const res = await http.post('/user/login', credentials)
        return res.data
    },
    async logout() {
        const res = await http.post('/user/logout')
        return res.data
    }
}