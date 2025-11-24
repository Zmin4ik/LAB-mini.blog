<template>
  <div class="max-w-3xl mx-auto space-y-4">
    <div v-if="!post">Loading...</div>
    <div v-else>
      <div class="flex items-center gap-4">
        <img :src="author?.avatar || '/avatars/avatar1.png'" class="w-16 h-16 rounded-full" />
        <div>
          <h2 class="text-xl font-bold">{{ post.title }}</h2>
          <div class="text-sm">by <router-link :to="{ name: 'AuthorProfile', params: { id: author?.id } }">{{ author?.name }}</router-link></div>
        </div>
      </div>

      <div class="mt-4">
        <p>{{ post.content }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useDataStore } from '../stores/useDataStore'
import { useAuthors } from '../composables/useAuthors'
import { usePosts } from '../composables/usePosts'

export default defineComponent({ setup() {
    const route = useRoute()
    const store = useDataStore()
    const { load: loadAuthors } = useAuthors()
    const { load: loadPosts } = usePosts()
    const post = ref(null as any)
    const author = ref(null as any)

    onMounted(async () => {
      await loadAuthors()
      await loadPosts()
      const id = String(route.params.id)
      post.value = store.posts.find((p: any) => p.id === id)
      if (post.value) author.value = store.authors.find((a: any) => a.id === post.value.authorId)
    })

    return { post, author }
  } })
</script>