<template>
  <div class="produccion">
    <h2>Producción</h2>
    <div class="table-container">
      <table class="product-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Costo</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(producto, index) in productos" :key="index">
            <td>{{ producto.nombre }}</td>
            <td>{{ producto.costo }}</td>
            <td>{{ producto.precio }}</td>
          </tr>
        </tbody>
      </table>
      <!-- Paginación -->
      <div class="pagination">
        <button>Primera Página</button>
        <button v-for="page in totalPaginas" :key="page">{{ page }}</button>
        <button>Última Página</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { fetchProductos, totalPaginas } from '../api';

// Variable reactiva para almacenar los productos
const productos = ref<Array<{ nombre: string; costo: number; precio: number }>>([]);

// Función para obtener los productos
const obtenerProductos = async () => {
  productos.value = await fetchProductos();
};

// Llamada a la función cuando el componente se monta
onMounted(() => {
  obtenerProductos();
});
</script>

  
  <style scoped>
  .produccion {
    padding: 20px;
  }
  
  .table-container {
    margin-top: 20px;
  }
  
  .product-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .product-table th, .product-table td {
    padding: 10px;
    border: 1px solid #0c0c0c;
    text-align: left;
  }
  
  .pagination {
    margin-top: 10px;
    display: flex;
    gap: 5px;
  }
  </style>
  