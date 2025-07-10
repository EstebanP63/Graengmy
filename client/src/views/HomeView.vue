<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'

import { useRouter } from 'vue-router'
const router = useRouter()

const logout = () => {
  localStorage.removeItem('token')
  sessionStorage.removeItem('token')
  router.push('/login')
}

</script>

<template>
  <main>
    <TheWelcome />
    <div>
    <h1>Bienvenido a tu panel</h1>
    <button @click="logout">Cerrar sesión</button>
  </div>
  </main>
</template>
