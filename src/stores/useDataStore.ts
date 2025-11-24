import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Author {
    id: string
    name: string
    avatar: string
}

export interface Post {
    id: string
    authorId: string
    title: string
    content: string
    type: string
}

export const useDataStore = defineStore('data', () => {
    const authors = ref<Author[]>([])
    const posts = ref<Post[]>([])

    function setAuthors(a: Author[]) { authors.value = a }
    function setPosts(p: Post[]) { posts.value = p }

    return { authors, posts, setAuthors, setPosts }
})