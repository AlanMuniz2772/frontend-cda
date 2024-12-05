<template>
  <div class="ordenes-de-compra">
    <!-- Título -->
    <h2>Órdenes de Venta</h2>

    <!-- Tabla de órdenes -->
    <div>
      <table>
        <thead>
          <tr>
            <th>Orden</th>
            <th>Hora</th>
            <th>Pago</th>
            <th>Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(order, index) in currentOrders" :key="index">
            <td>{{ order.id }}</td>
            <td>{{ order.hora }}</td>
            <td>{{ order.tipo_pago }}</td>
            <td>${{ order.total }}</td>
            <td class="action-cell">
              <button class="delete-button" @click="eliminarOrden(order.id, order.tipo_pago, 0)">
                🗑️
              </button>
            </td>
         
          </tr>
        </tbody>
      </table>
      
      <!-- Paginación -->
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">Primera Página</button>
        <span v-for="page in totalPages" :key="page">
          <button
            :class="{ active: currentPage === page }"
            @click="changePage(page)"
          >
            {{ page }}
          </button>
        </span>
        <button @click="nextPage" :disabled="currentPage === totalPages">
          Última Página
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import {fetchOrdenVenta, deleteOrder} from '../api';


onMounted(async () => {
  obtenerOrdenes();
});

interface Order {
  id: number;
  hora: string;
  tipo_pago: string;
  total: number;
}

const orders = ref<Order[]>([]);

// Lógica de paginación
const currentPage = ref(1);
const itemsPerPage = 5;

const obtenerOrdenes = async () => {
  orders.value = await fetchOrdenVenta();
  console.log(orders.value)
    };

const totalPages = computed(() =>
  Math.ceil(orders.value.length / itemsPerPage)
);

const currentOrders = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return orders.value.slice(start, end);
});

const changePage = (page: number) => {
  currentPage.value = page;
};

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

// Lógica para eliminar una orden
const eliminarOrden = (id: number, tipo_pago:string, is_available:number) => {
  deleteOrder(id, tipo_pago,is_available);
  obtenerOrdenes();
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

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

thead {
  background-color: white; /* Fondo blanco */
  color: black; /* Letras negras */
}


th, td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #181717;
}

tr:hover {
  background-color: #f1f1f1; /* Efecto hover */
}

.action-cell {
  text-align: center;
}

.delete-button {
  background: none;
  border: none;
  font-size: 18px;
  color: #dc3545;
  cursor: pointer;
}

.delete-button:hover {
  color: #a71d2a;
}

/* Estilos de la paginación */
.pagination {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.pagination button {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: rgb(179, 170, 170);
  cursor: pointer;
}

.pagination button.active {
  background-color: #4caf50;
  color: white;
}

.pagination button:disabled {
  background-color: #8e9194;
  cursor: not-allowed;
}
</style>
