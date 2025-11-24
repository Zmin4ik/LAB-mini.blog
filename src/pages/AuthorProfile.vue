<template>
  <div class="max-w-3xl mx-auto space-y-6">
    <div class="flex gap-6 items-center">
      <img :src="author.avatar" class="w-32 h-32 rounded-full" />
      <div>
        <h2 class="text-2xl font-bold">{{ author.name }}</h2>

        <div class="mt-2">
          <div class="countdown">
            <span class="countdown font-mono text-4xl" :style="`--value:${allPosts.length}`"></span>
          </div>
        </div>

      </div>
    </div>

    <div>
      <h3 class="text-lg font-semibold">Posts</h3>

      <div class="flex gap-2 my-2">
        <button class="btn btn-sm" :class="{ 'btn-active': filter === 'All' }" @click="filter = 'All'">All</button>
        <button v-for="t in types" :key="t" class="btn btn-sm" :class="{ 'btn-active': filter === t }" @click="filter = t">{{ t }}</button>
      </div>

      <div ref="postsList" class="space-y-4">
        <PostCard v-for="p in filtered" :key="p.id" :post="p" :author="author" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { useDataStore } from '../stores/useDataStore'
import PostCard from '../components/PostCard.vue'
import { POST_TYPES } from '../data/constants'
import { useAuthors } from '../composables/useAuthors'
import { usePosts } from '../composables/usePosts'

export default defineComponent({ components: { PostCard }, setup() {
    const route = useRoute()
    const store = useDataStore()
    const { load: loadAuthors } = useAuthors()
    const { load: loadPosts } = usePosts()

    const author = ref({ name: 'Unknown', avatar: '/avatars/avatar1.png', id: String(route.params.id) })
    const types = POST_TYPES
    const filter = ref('All')
    const postsListRef = ref<HTMLElement | null>(null)

    onMounted(async () => {
      await loadAuthors()
      await loadPosts()
      const a = store.authors.find(x => x.id === String(route.params.id))
      if (a) author.value = a
      await nextTick()
    })

    const allPosts = computed(() => store.posts.filter(p => p.authorId === String(route.params.id)))
    const filtered = computed(() => filter.value === 'All' ? allPosts.value : allPosts.value.filter(p => p.type === filter.value))

    return { author, types, filter, filtered, postsList: postsListRef, allPosts }
  } })
</script>