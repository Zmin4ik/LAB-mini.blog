<template>
  <div class="max-w-xl mx-auto space-y-4">
    <h2 class="text-xl font-bold">Create Author</h2>
    <input v-model="name" placeholder="Author name" class="input input-bordered w-full" />
    <AvatarPicker :avatars="avatars" v-model="avatar" />
    <div class="flex gap-2">
      <button class="btn btn-primary" @click="create">Create</button>
      <router-link to="/" class="btn">Cancel</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import AvatarPicker from '../components/AvatarPicker.vue'
import { useDataStore } from '../stores/useDataStore'
import { AVATARS } from '../data/constants'

export default defineComponent({
  components: { AvatarPicker },
  setup() {
    const router = useRouter()
    const store = useDataStore()
    const name = ref('')
    const avatar = ref(AVATARS[0])

    function create() {
      const id = Date.now().toString()
      const author = { id, name: name.value || 'Anonymous', avatar: avatar.value }
      store.addAuthor(author)
      router.push({ name: 'AuthorProfile', params: { id } })
    }

    return { name, avatar, avatars: AVATARS, create }
  }
})
</script>