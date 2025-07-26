<script setup>
import { ref, computed } from 'vue'
import { jwtDecode } from 'jwt-decode'
import { useRouter } from 'vue-router'

const router = useRouter()

import DynamicTable from '../components/DynamicTableEditor.vue'

const token = localStorage.getItem('token') || sessionStorage.getItem('token')
const decoded = jwtDecode(token)

const form = ref({
    name: "",
    description: "",
    contentBlocks: [],
    author: decoded.id
})

const addContentBlock = () => {
    form.value.contentBlocks.push({
        type: '',
        payload: {}
    });
}

const removeContentBlock = (index) => {
  form.value.contentBlocks.splice(index, 1);
};

const hasTitleBlock = computed(() =>
    form.value.contentBlocks.some(block => block.type === 'title')
)

const prepareLessonPayload = ()  => {
    const orderedBlocks = form.value.contentBlocks.map((block, index) => ({
    type: block.type,
    payload: block.payload,
    order: index + 1
  }));
  return {
    ...form.value,
        contentBlocks: orderedBlocks
  }
}
const submitLesson = async () => {
    const lessonData = prepareLessonPayload()
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/lessons`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(lessonData)
    });

    const result = await res.json();
    console.log('Lesson created:', result);
    router.push('/admin')
  } catch (err) {
    console.error('Error creating lesson:', err);
  }
};

</script>

<template>
    <form>
        <label for="name">Nombre de la lección</label>
        <input id="name" type="name" v-model="form.name" autocomplete="name" placeholder="Verbo To be">
        <label for="description">Descripción de la lección</label>
        <input id="description" type="text" v-model="form.description" autocomplete="description" placeholder="Una lección sobre el verbo To Be y sus conjugaciones en tiempo presente">
        <h2>Contenido</h2> <button @click="addContentBlock" type="button">Añadir bloque de contenido</button>
        <div v-for="block, index in form.contentBlocks">
            <label>Tipo de contenido
                <select name="type" v-model="block.type">
                    <option value="">Seleccione</option>
                    <option value="title" :disabled="hasTitleBlock">Título</option>
                    <option value="text">Texto</option>
                    <option value="table">Tabla</option>
                    <option value="question">Pregunta</option>
                </select>
            </label>
            
            <div v-if="block.type === 'title'">
                <label for="title">Título</label>
                <input id="title" type="text" placeholder="El verbo To Be" v-model="block.payload.title">
            </div>
            <div v-if="block.type === 'text'">
                <label>Texto <textarea name="text" type="text" placeholder="Es uno de los verbos mas utilizados en el ingles, significando tanto Ser como Estar" v-model="block.payload.text"></textarea></label>             
            </div>

            <DynamicTable v-if="block.type === 'table'" :modelValue="block.payload.table" @update:modelValue="block.payload.table = $event"/>

            <div v-if="block.type === 'question'">
                <label>Pregunta <input name="question" v-model="block.payload.question" placeholder="Where _ Waldo" /></label>
                <label>Respuesta <input name="answer" v-model="block.payload.answer" placeholder="is" /></label>
            </div>
            <button type="button" @click="removeContentBlock(index)">Eliminar bloque de contenido</button>
        </div>
        <button @click.prevent="submitLesson">Crear lección</button>
    </form>

    <RouterLink to="/admin">Volver</RouterLink>
</template>

<style>
.block {
  margin-bottom: 1.5em;
}
form input, form textarea, form select {
  display: block;
  margin-bottom: 0.5em;
  width: 100%;
  max-width: 500px;
}
</style>