import { promises as fs } from 'fs'
import path from 'path'

const dbPath = path.resolve(process.cwd(), 'src', 'db')

export async function readJson<T>(file: string, fallback: T): Promise<T> {
    const full = path.join(dbPath, file)
    try {
        const raw = await fs.readFile(full, 'utf-8')
        return JSON.parse(raw) as T
    } catch (e) {
        return fallback
    }
}

export async function writeJson<T>(file: string, data: T) {
    const full = path.join(dbPath, file)
    await fs.mkdir(path.dirname(full), { recursive: true })
    await fs.writeFile(full, JSON.stringify(data, null, 2), 'utf-8')
}