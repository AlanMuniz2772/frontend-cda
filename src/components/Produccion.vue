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
  
  <script setup>
  import { ref } from 'vue';
  
  // Datos de ejemplo
  const productos = ref([
    { nombre: 'Producto A', costo: '$ 100.00', precio: '$ 120.00' },
    { nombre: 'Producto B', costo: '$ 150.00', precio: '$ 180.00' },
    { nombre: 'Producto C', costo: '$ 200.00', precio: '$ 220.00' },
    // Agrega más productos según sea necesario
  ]);
  
  // Número total de páginas para paginación (ajusta según la cantidad de productos)
  const totalPaginas = ref(10);
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
    border: 1px solid #ddd;
    text-align: left;
  }
  
  .pagination {
    margin-top: 10px;
    display: flex;
    gap: 5px;
  }
  </style>
  