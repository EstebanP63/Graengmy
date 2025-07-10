<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { useAuthRedirect } from '../composables/useAuthRedirect.js'
useAuthRedirect('/');

const router = useRouter()

const form = ref({
  email: '',
  password: '',
  remember: false,
})
const error = ref('')

const submit = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: form.value.email,
        password: form.value.password
      })
    })
    const data = await res.json()

    if (!res.ok) throw new Error(data.error || 'Login failed')

    if(form.value.remember) {
        localStorage.setItem('token', data.token)
    } else {
        sessionStorage.setItem('token', data.token)
    }
    
    router.push('/')
  } catch (err) {
    error.value = err.message
  }
}

</script>

<template>
  <form @submit.prevent="submit">
    <div>
      <label for="email">Correo</label>
      <input id="email" v-model="form.email" type="email" required autocomplete="email" />
    </div>
    <div>
      <label for="password">Contraseña</label>
      <input id="password" v-model="form.password" type="password" required autocomplete="current-password" />
    </div>
    <div>
      <input id="remember" type="checkbox" v-model="form.remember" />
      <label for="remember">Recordarme</label>
    </div>
    <div>
        <RouterLink to="/register">No tengo una cuenta</RouterLink>
      <button type="submit">Ingresar</button>
    </div>
    <p v-if="error">{{ error }}</p>
  </form>
</template>
