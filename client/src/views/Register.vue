<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { useAuthRedirect } from '../composables/useAuthRedirect.js'
useAuthRedirect('/');

const router = useRouter()

const form = ref({
  username: '',
  email: '',
  password: ''
})

const error = ref('')
const loading = ref(false)

const submit = async () => {
  loading.value = true
  error.value = ''

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Signup failed')

    localStorage.setItem('token', data.token || '')

    router.push('/')
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form @submit.prevent="submit">
    <div>
      <label for="username">Usuario</label>
      <input id="username" v-model="form.username" type="text" required />
    </div>

    <div>
      <label for="email">Correo</label>
      <input id="email" v-model="form.email" type="email" required />
    </div>

    <div>
      <label for="password">Contraseña</label>
      <input id="password" v-model="form.password" type="password" required />
    </div>

    <div>
      <button type="submit" :disabled="loading">
        {{ loading ? 'Registrando...' : 'Crear cuenta' }}
      </button>
    </div>

    <p v-if="error" style="color:red">{{ error }}</p>
  </form>
</template>
