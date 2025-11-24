import http from '../../api/http'
import type { Author } from '../../stores/useDataStore'

export const AuthorApi = {
    async list() {
        const res = await http.get<Author[]>('/authors')
        return res.data
    },
    async create(payload: Omit<Author, 'id'>) {
        const res = await http.post<Author>('/authors', payload)
        return res.data
    },
    async postsList(authorId: string) {
        const res = await http.get(`/authors/${authorId}/posts`)
        return res.data
    }
}