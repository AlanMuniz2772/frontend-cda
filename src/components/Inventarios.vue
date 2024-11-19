<template>
  <div class="inventarios-container">
    <h2>Inventarios</h2>
    <div class="filters">
      <!-- Filtro de rango de fechas -->
      <label>
        Buscar Fecha
        <input type="text" placeholder="Rango de Fechas" v-model="searchDate" />
      </label>

      <!-- Botón de nuevo inventario -->
      <button class="new-inventory-btn">Nuevo Inventario</button>
    </div>

    <!-- Tabla de inventarios -->
    <table class="inventory-table">
      <thead>
        <tr>
          <th>Fecha</th>
    
          <th>Varianza $</th>
          <th>Varianza %</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="inventory in filteredInventories" :key="inventory.id">
          <td>{{ inventory.date }}</td>
          <td :class="{ negative: inventory.varianceDollar < 0 }">
            {{ formatCurrency(inventory.varianceDollar) }}
          </td>
          <td :class="{ negative: inventory.variancePercent < 0 }">
            {{ inventory.variancePercent }}%
          </td>
          <td><button class="view-btn">👁️</button></td>
        </tr>
      </tbody>
    </table>

    <!-- Paginación -->
    <div class="pagination">
      <button @click="goToPage(1)">Primera Página</button>
      <button v-for="page in totalPages" :key="page" :class="{ active: page === currentPage }" @click="goToPage(page)">
        {{ page }}
      </button>
      <button @click="goToPage(totalPages)">Última Página</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// Datos de ejemplo de inventarios con la sucursal
const inventories = ref([
  { id: 1, date: '20 Sep 2024', branch: 'Saltillo 1 - Plaza Cocoa', varianceDollar: 0, variancePercent: 0 },
  { id: 2, date: '18 Sep 2024', branch: 'Saltillo 2 - Centro', varianceDollar: 0, variancePercent: 0 },
  { id: 3, date: '15 Sep 2024', branch: 'Saltillo 3 - Sur', varianceDollar: 0, variancePercent: 0 },
  { id: 4, date: '14 Sep 2024', branch: 'Saltillo 2 - Centro', varianceDollar: -95.64, variancePercent: -18.04 },
  { id: 5, date: '11 Sep 2024', branch: 'Saltillo 1 - Plaza Cocoa', varianceDollar: 0, variancePercent: 0 },
]);

// Variables de paginación
const currentPage = ref(1);
const totalPages = ref(6);

// Variable para el filtro de fecha
const searchDate = ref('');

// Función para ir a una página específica
const goToPage = (page: number) => {
  currentPage.value = page;
};

// Función para formatear el valor monetario
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
};

// Computed para filtrar inventarios por fecha
const filteredInventories = computed(() => {
  return inventories.value.filter(inventory => {
    return inventory.date.includes(searchDate.value);
  });
});
</script>
  
  <style scoped>
  .inventarios-container {
    padding: 20px;
  }
  
  .filters {
    display: flex;
    gap: 20px;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .filters label {
    display: flex;
    flex-direction: column;
    font-size: 14px;
  }
  
  .new-inventory-btn {
    background-color: #28a745;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .inventory-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  .inventory-table th,
  .inventory-table td {
    padding: 10px;
    border: 1px solid #020202;
    text-align: center;
  }
  
  .progress-bar {
    position: relative;
    background-color: #f0f0f0;
    border-radius: 5px;
    height: 20px;
    width: 100%;
  }
  
  .progress {
    background-color: #007bff;
    height: 100%;
    border-radius: 5px;
  }
  
  .negative {
    color: red;
  }
  
  .view-btn {
    background: none;
    border: none;
    cursor: pointer;
  }
  
  .pagination {
    display: flex;
    gap: 5px;
    justify-content: center;
    margin-top: 20px;
  }
  
  .pagination button {
    background-color: #cc0d0d;
    border: 1px solid #ddd;
    padding: 5px 10px;
    cursor: pointer;
  }
  
  .pagination .active {
    background-color: #007bff;
    color: white;
  }
  </style>
  