<template>
  <div class="reportes-container">
    <h2>Reportes</h2>
    
    <!-- Tabla de Ventas por Día -->
    <div class="table-container">
      <h3>Ventas por Día</h3>
      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Número de Ventas</th>
            <th>Total Vendido</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="venta in ventasPorDia" :key="venta.fecha">
            <td>{{ venta.fecha }}</td>
            <td>{{ venta.numeroVentas }}</td>
            <td>{{ venta.totalVendido }}</td>
          </tr>
        </tbody>
      </table>
    </div>

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
import { fetchVentasPorDia, fetchProductosMasVendidos } from '../api';


    // Variables reactivas para almacenar los datos de ventas por día y productos más vendidos
    const ventasPorDia = ref<Array<{ fecha: string; numeroVentas: number; totalVendido: number }>>([]);
    const productosMasVendidos = ref<Array<{ nombre: string; cantidadVendida: number }>>([]);

    // Función para obtener los datos de ventas por día
    const obtenerVentasPorDia = async () => {
      ventasPorDia.value = await fetchVentasPorDia();
    };

    // Función para obtener los productos más vendidos
    const obtenerProductosMasVendidos = async () => {
      productosMasVendidos.value = await fetchProductosMasVendidos();
    };

    // Llamamos a ambas funciones cuando el componente se monta
    onMounted(() => {
      obtenerVentasPorDia();
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
  