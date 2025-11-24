import { Router } from 'express'
import { readJson, writeJson } from '../utils/fs'
import { Author, Post } from '../contracts/types'
import { randomUUID } from 'crypto'

const router = Router()

router.get('/', async (req, res) => {
    const authors = await readJson<Author[]>('authors.json', [])
    res.json(authors)
})

router.post('/', async (req, res) => {
    const authors = await readJson<Author[]>('authors.json', [])
    const { name, avatar } = req.body as Partial<Author>
    if (!name) return res.status(400).json({ message: 'Name is required' })
    if (authors.find(a => a.name === name)) return res.status(400).json({ message: 'Author with that name is already exist' })
    const newAuthor: Author = { id: randomUUID(), name, avatar: avatar || '/avatars/avatar1.png' }
    authors.unshift(newAuthor)
    await writeJson('authors.json', authors)
    res.json(newAuthor)
})

router.get('/:id/posts', async (req, res) => {
    const authors = await readJson<Author[]>('authors.json', [])
    const posts = await readJson<Post[]>('posts.json', [])
    const authorId = req.params.id
    const a = authors.find(x => x.id === authorId)
    if (!a) return res.status(404).json({ message: 'Author does not exist' })
    const list = posts.filter(p => p.authorId === authorId)
    res.json(list)
})

export default router