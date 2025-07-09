import {onMounted} from 'vue'
import {useRouter} from 'vue-router'

export function useAuthRedirect(route = '/') {
    const router = useRouter()

    onMounted(() => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token')
        if (token) {
            router.push(route)
        }
    })
}