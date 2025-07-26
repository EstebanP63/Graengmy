<script setup>
import { ref, onMounted } from 'vue'

import LessonsRenderer from '../components/LessonsRenderer.vue'

const lessons = ref ([])
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
  <div>
    <h1>Lecciones</h1>
    <div v-if="loading" class="loading">Cargando lecciones...</div>
    <div v-else>
      <div v-if="!loading && lessons.length < 1">No se encontraron lecciones</div>
      <ul v-else>
        <LessonsRenderer
          :lessons="lessons"
          viewMode="admin"
        />
        <!--
        <li v-for="lesson in lessons" :key="lesson._id">
          {{ lesson.name }} — {{ lesson.description }} - {{ lesson.contentBlocks }}
        </li>
        -->
      </ul>
      <RouterLink to="/createLesson">Añadir Lección</RouterLink>
      <RouterLink to="/">Volver</RouterLink>
    </div> 
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