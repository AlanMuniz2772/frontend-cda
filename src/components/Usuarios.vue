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
          <tr>
            <td>Emmanuel V</td>
            <td>Cajero</td>
            <td>Saltillo 1</td>
            <td>
              <input type="checkbox" checked disabled />
            </td>
          </tr>
          <!-- Puedes añadir más filas de usuarios aquí -->
        </tbody>
      </table>
      <button @click="nuevoUsuario">Nuevo Usuario</button>
    </div>
  </template>
  
  <script setup lang="ts">
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
    border: 1px solid #ddd;
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
  