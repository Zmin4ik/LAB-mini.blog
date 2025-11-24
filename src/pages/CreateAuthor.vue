<template>
  <div class="max-w-xl mx-auto space-y-4">
    <h2 class="text-xl font-bold">Create Author</h2>
    <input v-model="name" placeholder="Author name" class="input input-bordered w-full" />
    <AvatarPicker :avatars="avatars" v-model="avatar" />
    <div class="flex gap-2">
      <button class="btn btn-primary" @click="create" :disabled="isLoading">Create</button>
      <router-link to="/" class="btn">Cancel</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import AvatarPicker from '../components/AvatarPicker.vue'
import { AVATARS } from '../data/constants'
import { useAuthors } from '../composables/useAuthors'
import { useRouter } from 'vue-router'

export default defineComponent({
  components: { AvatarPicker },
  setup() {
    const name = ref('')
    const avatar = ref(AVATARS[0])
    const { create, isLoading } = useAuthors()
    const router = useRouter()

    async function createAuthor() {
      try {
        const a = await create({ name: name.value || 'Anonymous', avatar: avatar.value })
        router.push({ name: 'AuthorProfile', params: { id: a.id } })
      } catch (e) {
      }
    }

    return { name, avatar, avatars: AVATARS, create: createAuthor, isLoading }
  }
})
</script>