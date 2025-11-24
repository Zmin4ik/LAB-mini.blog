<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold">Feed</h1>
      <div>
        <select v-model="filter" class="select select-bordered">
          <option value="All">All</option>
          <option v-for="t in types" :key="t">{{ t }}</option>
        </select>
      </div>
    </div>

    <div v-if="loading" class="flex justify-center my-8">
      <button class="btn loading">Loading</button>
    </div>

    <div class="grid gap-4">
      <PostCard v-for="p in filteredPosts" :key="p.id" :post="p" :author="authorFor(p.authorId)" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useDataStore, type Post, type Author } from '../stores/useDataStore'
import PostCard from '../components/PostCard.vue'
import { POST_TYPES } from '../data/constants'
import { useAuthors } from '../composables/useAuthors'
import { usePosts } from '../composables/usePosts'

export default defineComponent({ components: { PostCard }, setup() {
    const store = useDataStore()
    const filter = ref('All')
    const types = POST_TYPES
    const { load: loadAuthors } = useAuthors()
    const { load: loadPosts, isLoading } = usePosts()

    onMounted(async () => {
      await loadAuthors()
      await loadPosts()
    })

    const loading = isLoading

    const filteredPosts = computed(() => {
      if (filter.value === 'All') return store.posts
      return store.posts.filter(p => p.type === filter.value)
    })

    function authorFor(id: string): Author {
      return store.authors.find(a => a.id === id) || { name: 'Unknown', avatar: '/avatars/avatar1.png', id }
    }

    return { filter, types, filteredPosts, authorFor, loading }
  } })
</script>