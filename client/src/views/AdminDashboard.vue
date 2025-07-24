<script setup>

import { ref, onMounted } from 'vue'

const lessons = ref ([])
const loading = ref(true)

onMounted(async () => {
    try{
        const response = await fetch('http://localhost:5000/api/lessons')
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
  <div>
    <h1>Lecciones</h1>
    <div v-if="loading" class="loading">Cargando lecciones...</div>
    <div v-if="!loading && lessons.length < 1">
        <div>No se encontraron lecciones</div>
        <RouterLink to="/createLesson">Añadir Lección</RouterLink>
    </div>
    <ul v-else>
      <li v-for="lesson in lessons" :key="lesson._id">
        {{ lesson.name }} — {{ lesson.description }} - {{ lesson.contentBlocks }}
      </li>
    </ul>
  </div>
</template>

<style>
.loading {
  animation: pulse 1s infinite;
  font-weight: bold;
}

@keyframes pulse {
  0% { opacity: 0.5; }
  50% { opacity: 1; }
  100% { opacity: 0.5; }
}
</style>