export const AVATARS = [
    '/avatars/avatar1.png',
    '/avatars/avatar2.png',
    '/avatars/avatar3.png',
    '/avatars/avatar4.png',
    '/avatars/avatar5.png',
    '/avatars/avatar6.png'
]

export const POST_TYPES = ['Games', 'Sports', 'Study'] as const

export const TYPE_COLOR: Record<string, string> = {
    Games: 'badge-primary',
    Sports: 'badge-secondary',
    Study: 'badge-accent'
}