<script setup lang="ts">
import { jwtDecode } from 'jwt-decode'
import { ref } from 'vue'
import type { DecodedToken } from '../types/auth.ts'

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

</script>

<template>
  <main>
    <div>
    <h1>Bienvenido a tu panel</h1>
    <button @click="logout">Cerrar sesión</button>
    <RouterLink v-if="userRole === 'admin'" to="/admin">Panel de administracion</RouterLink>
  </div>
  </main>
</template>
