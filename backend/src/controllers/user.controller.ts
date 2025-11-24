import { Router } from 'express'
import { readJson, writeJson } from '../utils/fs'
import { UserFile } from '../contracts/types'

const router = Router()
const FILE_NAME = 'user.json'

router.get('/', async (req, res) => {
    const user = await readJson<UserFile>(FILE_NAME, {
        username: 'admin',
        password: 'pass',
        isLoggedIn: false
    })

    res.json({
        username: user.username,
        isLoggedIn: user.isLoggedIn
    })
})

router.post('/login', async (req, res) => {
    const user = await readJson<UserFile>(FILE_NAME, {
        username: 'admin',
        password: 'pass',
        isLoggedIn: false
    })

    const { username, password } = req.body as Partial<UserFile>

    if (!username || !password) {
        return res.status(400).json({ message: 'username & password required' })
    }

    if (username !== user.username || password !== user.password) {
        return res.status(401).json({ message: 'Invalid credentials' })
    }

    user.isLoggedIn = true
    await writeJson(FILE_NAME, user)

    res.json({ success: true })
})

router.post('/logout', async (req, res) => {
    const user = await readJson<UserFile>(FILE_NAME, {
        username: 'admin',
        password: 'pass',
        isLoggedIn: false
    })

    user.isLoggedIn = false
    await writeJson(FILE_NAME, user)

    res.json({ success: true })
})

export default router