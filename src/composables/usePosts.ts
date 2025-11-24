import { ref } from 'vue'
import { PostApi } from '../controllers/Post/post.api'
import { useDataStore, type Post } from '../stores/useDataStore'

export function usePosts() {
    const isLoading = ref(false)
    const store = useDataStore()

    async function load() {
        isLoading.value = true
        try {
            const list = await PostApi.list()
            store.setPosts(list)
        } finally { isLoading.value = false }
    }

    async function create(payload: Omit<Post, 'id'>) {
        isLoading.value = true
        try {
            const p = await PostApi.create(payload)
            store.posts.unshift(p)
            return p
        } finally { isLoading.value = false }
    }

    return { isLoading, load, create }
}