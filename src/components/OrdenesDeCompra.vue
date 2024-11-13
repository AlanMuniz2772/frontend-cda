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

      <!-- Botón de búsqueda -->
      <button class="search-button" @click="searchOrders">Buscar</button>
    </div>

    <!-- Mensaje de no hay pedidos -->
    <div class="no-orders" v-if="filteredOrders.length === 0">
      Aun no hay pedidos registrados.
    </div>

    <!-- Tabla de órdenes -->
    <div v-else>
      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Número de Ventas</th>
            <th>Total Vendido</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in filteredOrders" :key="order.fecha">
            <td>{{ order.fecha }}</td>
            <td>{{ order.numeroVentas }}</td>
            <td>{{order.totalVendido }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { fetchVentasPorDia } from '../api'; // Importa la función fetchVentasPorDia desde api.ts

// Variables de búsqueda
const searchOrder = ref('');
const searchDateRange = ref('');
const selectedBranch = ref('');

// Variable reactiva para almacenar los datos de ventas por día
const ventasPorDia = ref<Array<{ fecha: string; numeroVentas: number; totalVendido: number }>>([]);

// Función para obtener datos de ventas
const obtenerVentasPorDia = async () => {
  ventasPorDia.value = await fetchVentasPorDia();
};

// Filtrar las órdenes en función de los criterios de búsqueda
const filteredOrders = computed(() => {
  return ventasPorDia.value.filter(order => {
    const matchesOrderNumber = searchOrder.value === '' || order.numeroVentas.toString().includes(searchOrder.value);
    const matchesDate = searchDateRange.value === '' || order.fecha.includes(searchDateRange.value);
    return matchesOrderNumber && matchesDate;
  });
});

// Función de búsqueda (opcional)
const searchOrders = () => {
  console.log('Buscar órdenes con:', searchOrder.value, searchDateRange.value, selectedBranch.value);
};

// Llama a obtenerVentasPorDia cuando el componente se monta
onMounted(obtenerVentasPorDia);
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

  table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

thead {
  background-color: #4CAF50; /* Color de encabezado */
  color: white;
}

th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

tr:hover {
  background-color: #f1f1f1; /* Efecto de hover en filas */
}

td {
  color: #333;
}

.no-orders {
  font-size: 18px;
  color: #000000;
  text-align: center;
  margin-top: 20px;
  background-color: #f8d7da; /* Fondo para mensaje de no pedidos */
  padding: 15px;
  border-radius: 5px;
}


  </style>
  