import http from '../../api/http'
import type { Post } from '../../stores/useDataStore'

export const PostApi = {
    async list() {
        const res = await http.get<Post[]>('/posts')
        return res.data
    },
    async create(payload: Omit<Post, 'id'>) {
        const res = await http.post<Post>('/posts', payload)
        return res.data
    }
}