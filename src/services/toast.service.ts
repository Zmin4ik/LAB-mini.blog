import { reactive } from 'vue'

export type Toast = { id: number; text: string; type: 'success' | 'error' | 'info' }

const state = reactive<{ toasts: Toast[] }>({ toasts: [] })

export const ToastService = {
    get toasts() {
        return state.toasts
    },
    show(text: string, type: Toast['type'] = 'info') {
        const id = Date.now() + Math.floor(Math.random() * 1000)
        state.toasts.push({ id, text, type })
        setTimeout(() => {
            const idx = state.toasts.findIndex(t => t.id === id)
            if (idx >= 0) state.toasts.splice(idx, 1)
        }, 4000)
    },
    success(text: string) {
        this.show(text, 'success')
    },
    error(text: string) {
        this.show(text, 'error')
    }
}

export default ToastService