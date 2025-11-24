import { Router } from 'express'
import { readJson, writeJson } from '../utils/fs'
import { Post } from '../contracts/types'
import { randomUUID } from 'crypto'

const router = Router()

router.get('/', async (req, res) => {
    const posts = await readJson<Post[]>('posts.json', [])
    res.json(posts)
})

router.post('/', async (req, res) => {
    const posts = await readJson<Post[]>('posts.json', [])
    const { authorId, title, content, type } = req.body as Partial<Post>
    if (!authorId) return res.status(400).json({ message: 'authorId is required' })
    const newPost: Post = { id: randomUUID(), authorId, title: title || 'Untitled', content: content || '', type: type || 'Study' }
    posts.unshift(newPost)
    await writeJson('posts.json', posts)
    res.json(newPost)
})

export default router