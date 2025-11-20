<template>
  <div class="max-w-2xl mx-auto space-y-4">
    <h2 class="text-xl font-bold">Create Post</h2>
    <select v-model="authorId" class="select select-bordered w-full">
      <option disabled value="">Select author</option>
      <option v-for="a in store.authors" :key="a.id" :value="a.id">{{ a.name }}</option>
    </select>
    <input v-model="title" placeholder="Title" class="input input-bordered w-full" />
    <textarea v-model="content" placeholder="Content" class="textarea textarea-bordered w-full"></textarea>
    <select v-model="type" class="select select-bordered w-full">
      <option v-for="t in types" :key="t">{{ t }}</option>
    </select>
    <div class="flex gap-2">
      <button class="btn btn-primary" @click="create">Create</button>
      <router-link to="/" class="btn">Cancel</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useDataStore } from '../stores/useDataStore'
import { POST_TYPES } from '../data/constants'

export default defineComponent({
  setup() {
    const router = useRouter()
    const store = useDataStore()
    const authorId = ref('')
    const title = ref('')
    const content = ref('')
    const type = ref(POST_TYPES[0])
    const types = POST_TYPES

    function create() {
      if (!authorId.value) return
      const post = { id: Date.now().toString(), authorId: authorId.value, title: title.value || 'Untitled', content: content.value || '', type: type.value }
      store.addPost(post)
      router.push({ name: 'Feed' })
    }

    return { store, authorId, title, content, type, types, create }
  }
})
</script>