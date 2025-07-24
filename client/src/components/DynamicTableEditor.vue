<script setup>
import { ref, watch, onMounted } from 'vue';

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [["Encabezado", "Encabezado 2"], ["Ejemplo", "Ejemplo"]]
  }
});
const emit = defineEmits(['update:modelValue']);

const headers = ref([]);
const rows = ref([]);

onMounted(() => {
  if (!props.modelValue.length) {
    headers.value = ["Encabezado", "Encabezado 2"];
    rows.value = [["Ejemplo", "Ejemplo"]];
  } else {
    headers.value = [...props.modelValue[0]];
    rows.value = props.modelValue.slice(1).map(row => [...row]);
  }
});

watch([headers, rows], () => {
  const updatedTable = [headers.value, ...rows.value];
  emit('update:modelValue', updatedTable);
}, { deep: true });

// Add/remove logic
const addColumn = () => {
  headers.value.push(`Encabezado ${headers.value.length + 1}`);
  rows.value.forEach(row => row.push(""));
};

const addRow = () => {
  rows.value.push(headers.value.map(() => ""));
};

const removeRow = (index) => {
  rows.value.splice(index, 1);
};

const removeColumn = (colIndex) => {
  headers.value.splice(colIndex, 1);
  rows.value.forEach(row => row.splice(colIndex, 1));
};

</script>

<template>
  <div class="table-editor">
    <h2>Editor de tabla</h2>

    <table>
      <thead>
        <tr>
          <th v-for="(col, colIndex) in headers" :key="'header-' + colIndex">
            <input v-model="headers[colIndex]" placeholder="Encabezado" />
          </th>
          <th><button type=button @click="addColumn">Añadir Columna</button></th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(row, rowIndex) in rows" :key="'row-' + rowIndex">
          <td v-for="(cell, colIndex) in headers" :key="'cell-' + rowIndex + '-' + colIndex">
            <input v-model="rows[rowIndex][colIndex]" />
          </td>
          <td>
            <button type="button" @click="removeRow(rowIndex)">X</button>
          </td>
        </tr>

        <tr>
          <td v-for="(_, colIndex) in headers" :key="'delete-' + colIndex">
            <button type="button" @click="removeColumn(colIndex)">X</button>
          </td>
          <td>
            <button type="button" @click="addRow">Añadir fila</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
button {
  font-weight: bold;
}
.table-editor {
  margin-top: 1em;
  max-width: 800px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ccc;
  padding: 6px;
}
input {
  width: 100%;
  box-sizing: border-box;
}
button {
  margin: 4px;
}
</style>

