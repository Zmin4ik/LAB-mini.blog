import { createRouter, createWebHistory } from 'vue-router'
import Feed from '../pages/Feed.vue'
import CreateAuthor from '../pages/CreateAuthor.vue'
import CreatePost from '../pages/CreatePost.vue'
import AuthorProfile from '../pages/AuthorProfile.vue'
import Login from '../pages/Login.vue'
import PostView from '../pages/PostView.vue'
import { useAuthStore } from '../stores/useAuthStore'

const routes = [
    { path: '/', name: 'Feed', component: Feed },
    { path: '/posts/:id', name: 'Post', component: PostView, props: true },
    { path: '/authors/:id', name: 'AuthorProfile', component: AuthorProfile, props: true },
    { path: '/login', name: 'Login', component: Login },

    {
        path: '/admin',
        name: 'Admin',
        meta: { requiresAuth: true },
        component: () => import('../layouts/AdminLayout.vue'),
        children: [
            { path: 'authors/new', name: 'CreateAuthor', component: CreateAuthor },
            { path: 'posts/new', name: 'CreatePost', component: CreatePost }
        ]
    }
]

const router = createRouter({ history: createWebHistory(), routes })

router.beforeEach((to, from, next) => {
    const auth = useAuthStore()
    if ((to.meta as any).requiresAuth && !auth.isLoggedIn) {
        return next({ name: 'Login' })
    }
    next()
})

export default router