import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Feed from '../pages/Feed.vue'
import CreateAuthor from '../pages/CreateAuthor.vue'
import CreatePost from '../pages/CreatePost.vue'
import AuthorProfile from '../pages/AuthorProfile.vue'

const routes: Array<RouteRecordRaw> = [
    { path: '/', name: 'Feed', component: Feed },
    { path: '/authors/new', name: 'CreateAuthor', component: CreateAuthor },
    { path: '/posts/new', name: 'CreatePost', component: CreatePost },
    { path: '/authors/:id', name: 'AuthorProfile', component: AuthorProfile, props: true }
]

const router = createRouter({ history: createWebHistory(), routes })
export default router