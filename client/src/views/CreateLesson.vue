<script setup>
import { ref, computed } from 'vue'
import { jwtDecode } from 'jwt-decode'

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
        data: {}
    });
}

const removeContentBlock = (index) => {
  form.value.contentBlocks.splice(index, 1);
};

const hasTitleBlock = computed(() =>
    form.value.contentBlocks.some(block => block.type === 'title')
)
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
                <input id="title" type="text" placeholder="El verbo To Be" v-model="block.data.title">
            </div>
            <div v-if="block.type === 'text'">
                <label>Texto <textarea name="text" type="text" placeholder="Es uno de los verbos mas utilizados en el ingles, significando tanto Ser como Estar" v-model="block.data.text"></textarea></label>             
            </div>
            <div v-if="block.type === 'table'">


            <!--oof, gotta think of a way to let the user input a table without
            giving then a flat text input and expecting them to write json-->


            </div>
            <div v-if="block.type === 'question'">
                <label>Pregunta <input name="question" v-model="block.data.question" placeholder="Where _ Waldo" /></label>
                <label>Respuesta <input name="answer" v-model="block.data.answer" placeholder="is" /></label>
            </div>
            <button type="button" @click="removeContentBlock(index)">Eliminar bloque de contenido</button>
        </div>
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