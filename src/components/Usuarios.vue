<template>
  <div class="usuarios">
    <h1>Usuarios</h1>
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Tipo</th>
          <th>Sucursal</th>
          <th>Activo</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in usuarios" :key="user.id">
          <td>{{ user.name }}</td>
          <td>Cajero</td> <!-- Cambia según el tipo que desees mostrar -->
          <td>Saltillo 1</td> <!-- Cambia según la sucursal deseada -->
          <td>
            <input type="checkbox" checked disabled />
          </td>
        </tr>
      </tbody>
    </table>
    <button @click="nuevoUsuario">Nuevo Usuario</button>
  </div>
</template>

<script setup lang="ts">
import { usuarios } from '../api'; // Asegúrate de ajustar la ruta según tu estructura de carpetas

const nuevoUsuario = () => {
  // Lógica para agregar un nuevo usuario
};

</script>
  <style scoped>
  .usuarios {
    padding: 20px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    border: 1px solid #0a0a0a;
    padding: 8px;
  }
  
  th {
    background-color: #f2f2f2;
  }
  
  button {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #45a049;
  }
  </style>
  