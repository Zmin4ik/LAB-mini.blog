import { ref } from 'vue'
import { AuthorApi } from '../controllers/Author/author.api'
import { useDataStore, type Author } from '../stores/useDataStore'

export function useAuthors() {
    const isLoading = ref(false)
    const store = useDataStore()

    async function load() {
        isLoading.value = true
        try {
            const list = await AuthorApi.list()
            store.setAuthors(list)
        } finally { isLoading.value = false }
    }
    async function create(payload: Omit<Author, 'id'>) {
        isLoading.value = true
        try {
            const a = await AuthorApi.create(payload)
            store.authors.unshift(a)
            return a
        } finally { isLoading.value = false }
    }

    async function postsList(authorId: string) {
        isLoading.value = true
        try { return await AuthorApi.postsList(authorId) }
        finally { isLoading.value = false }
    }

    return { isLoading, load, create, postsList }
}