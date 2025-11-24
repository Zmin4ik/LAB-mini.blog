export interface Author {
    id: string
    name: string
    avatar: string
}

export interface Post {
    id: string
    authorId: string
    title: string
    content: string
    type: string
}

export interface UserFile {
    username: string
    password: string
    isLoggedIn: boolean
}