<template>
    <div class="reportes-container">
        <h2>Productos mas vendidos</h2>
        <!-- Tabla de Producto Más Vendido -->
    <div class="table-container">
      <h3>Producto Más Vendido</h3>
      <table>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad Vendida</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="producto in productosMasVendidos" :key="producto.nombre">
            <td>{{ producto.nombre }}</td>
            <td>{{ producto.cantidadVendida }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {fetchProductosMasVendidos } from '../api';

const productosMasVendidos = ref<Array<{ nombre: string; cantidadVendida: number }>>([]);

// Función para obtener los productos más vendidos
const obtenerProductosMasVendidos = async () => {
      productosMasVendidos.value = await fetchProductosMasVendidos();
    };

// Llamamos a ambas funciones cuando el componente se monta
onMounted(() => {
      obtenerProductosMasVendidos();
    });
</script>

<style scoped>
  .reportes-container {
    padding: 20px;
  }
  
  h2, h3 {
    color: #2c3e50;
  }
  
  .table-container {
    margin-bottom: 20px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 10px 0;
  }
  
  table, th, td {
    border: 1px solid #ddd;
  }
  
  th, td {
    padding: 8px;
    text-align: left;
  }
  
  th {
    background-color: #f2f2f2;
  }
  
  tbody tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  </style>