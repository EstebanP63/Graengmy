<script setup lang="ts">
import { jwtDecode } from 'jwt-decode'
import { ref, onMounted } from 'vue'
import type { DecodedToken } from '../types/auth.ts'
import LessonsRenderer from '@/components/LessonsRenderer.vue'

import { useRouter } from 'vue-router'
const router = useRouter()

const logout = () => {
  localStorage.removeItem('token')
  sessionStorage.removeItem('token')
  router.push('/login')
}

const userRole = ref('')
const token = localStorage.getItem('token') || sessionStorage.getItem('token')

if (token) { 
  const decoded = jwtDecode<DecodedToken>(token)
  userRole.value = decoded.role
}

const lessons = ref([])
const loading = ref(true)

onMounted(async () => {
    try{
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/lessons`)
        const data = await response.json()
        lessons.value = data
    } catch (error) {
        console.error('Error fetching lessons:', error)
    } finally {
        loading.value = false;
    }
})
</script>

<template>
  <main>
    <div>
    <h1>Bienvenido a tu panel</h1>

    <div v-if="loading" class="loading">Cargando lecciones...</div>
    <div v-else>
      <div v-if="!loading && lessons.length < 1">No se encontraron lecciones</div>
      <ul v-else>
        <LessonsRenderer
          :lessons="lessons"
          viewMode="user"
        />
      </ul>
    </div>

    <button @click="logout">Cerrar sesión</button>
    <RouterLink v-if="userRole === 'admin'" to="/admin">Panel de administracion</RouterLink>
  </div>
  </main>
</template>
