<template>
  <div class="max-w-2xl mx-auto space-y-4">
    <h2 class="text-xl font-bold">Create Post</h2>

    <select v-model="authorId" class="select select-bordered w-full">
      <option disabled value="">Select author</option>
      <option v-for="a in authors" :key="a.id" :value="a.id">{{ a.name }}</option>
    </select>

    <input v-model="title" placeholder="Title" class="input input-bordered w-full" />
    <textarea v-model="content" placeholder="Content" class="textarea textarea-bordered w-full"></textarea>

    <select v-model="type" class="select select-bordered w-full">
      <option v-for="t in types" :key="t">{{ t }}</option>
    </select>

    <div class="flex gap-2">
      <button class="btn btn-primary" @click="createPost" :disabled="isLoading">Create</button>
      <router-link to="/" class="btn">Cancel</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { POST_TYPES } from '../data/constants'
import { usePosts } from '../composables/usePosts'
import { useDataStore } from '../stores/useDataStore'
import { useAuthors } from '../composables/useAuthors'

export default defineComponent({
  setup() {
    const router = useRouter()
    const store = useDataStore()
    const authorId = ref('')
    const title = ref('')
    const content = ref('')
    const type = ref(POST_TYPES[0])
    const { create, isLoading, load } = usePosts()
    const { load: loadAuthors } = useAuthors()
    const types = POST_TYPES

    onMounted(async () => {
      await loadAuthors()
      await load()
    })

    async function createPost() {
      if (!authorId.value) return
      try {
        await create({
          authorId: authorId.value,
          title: title.value || 'Untitled',
          content: content.value || '',
          type: type.value
        })
        router.push({ name: 'Feed' })
      } catch (e) {
      }
    }

    return { authorId, title, content, type, types, createPost, isLoading, authors: store.authors }
  }
})
</script>