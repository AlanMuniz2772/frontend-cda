<template>
    <div class="ordenes-de-compra">
      <!-- Título -->
      <h2>Órdenes de Compra</h2>
  
      <!-- Barra de búsqueda -->
      <div class="search-bar">
        <!-- Campo para buscar orden -->
        <div class="search-field">
          <label for="order-search">Buscar Orden</label>
          <input id="order-search" type="text" placeholder="Escriba # Orden" v-model="searchOrder" />
        </div>
  
        <!-- Campo para buscar por rango de fechas -->
        <div class="search-field">
          <label for="date-range">Buscar Fecha Orden</label>
          <input id="date-range" type="text" placeholder="Rango de Fechas" v-model="searchDateRange" />
        </div>
  
        <!-- Selector de sucursal -->
        <div class="search-field">
          <label for="branch-select">Sucursal</label>
          <select id="branch-select" v-model="selectedBranch">
            <option value="" disabled selected>Seleccione Sucursal</option>
            <option v-for="branch in branches" :key="branch.id" :value="branch.name">{{ branch.name }}</option>
          </select>
        </div>
  
        <!-- Botón de búsqueda -->
        <button class="search-button" @click="searchOrders">Buscar</button>
      </div>
  
      <!-- Mensaje de no hay pedidos -->
      <div class="no-orders" v-if="orders.length === 0">
        Aun no hay pedidos registrados.
      </div>
  
      <!-- Tabla de órdenes (opcional, si hubiera pedidos) -->
      <div v-else>
        <!-- Tabla de órdenes (puedes agregarla aquí si quieres mostrar las órdenes) -->
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  // Campos de búsqueda
  const searchOrder = ref('');
  const searchDateRange = ref('');
  const selectedBranch = ref('');
  
  // Lista de sucursales
  const branches = ref([
    { id: 1, name: 'Saltillo 1 - Plaza Cocoa' },
    { id: 2, name: 'Saltillo 3 - Pedro Figueroa' },
    // Agrega más sucursales si es necesario
  ]);
  
  // Lista de órdenes (vacía inicialmente)
  const orders = ref([]);
  
  // Función para buscar órdenes
  const searchOrders = () => {
    // Implementa la lógica de búsqueda aquí
    console.log('Buscar órdenes con:', searchOrder.value, searchDateRange.value, selectedBranch.value);
  };
  </script>
  
  <style scoped>
  .ordenes-de-compra {
    padding: 20px;
  }
  
  h2 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  
  .search-bar {
    display: flex;
    gap: 20px;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .search-field {
    display: flex;
    flex-direction: column;
  }
  
  .search-field label {
    font-size: 14px;
    margin-bottom: 5px;
    color: #000000;
  }
  
  .search-field input,
  .search-field select {
    padding: 8px;
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 200px;
  }
  
  .search-button {
    padding: 10px 20px;
    font-size: 14px;
    color: white;
    background-color: #28a745;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .search-button:hover {
    background-color: #218838;
  }
  
  .no-orders {
    font-size: 18px;
    color: #000000;
    text-align: center;
    margin-top: 20px;
  }
  </style>
  