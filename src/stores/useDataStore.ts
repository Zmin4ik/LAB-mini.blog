import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

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

    function load() {
        try {
            const a = JSON.parse(localStorage.getItem('authors') || '[]') as Author[]
            const p = JSON.parse(localStorage.getItem('posts') || '[]') as Post[]
            authors.value = a
            posts.value = p
        } catch (e) {
            authors.value = []
            posts.value = []
        }
    }

    function save() {
        localStorage.setItem('authors', JSON.stringify(authors.value))
        localStorage.setItem('posts', JSON.stringify(posts.value))
    }

    function addAuthor(author: Author) {
        authors.value.push(author)
        save()
        return author.id
    }

    function addPost(post: Post) {
        posts.value.unshift(post)
        save()
    }

    function getAuthorById(id: string) {
        return authors.value.find(a => a.id === id)
    }

    function postsByAuthor(id: string) {
        return posts.value.filter(p => p.authorId === id)
    }

    load()

    watch([authors, posts], save, { deep: true })
    return { authors, posts, addAuthor, addPost, getAuthorById, postsByAuthor, load }
})