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
            <td>{{ formatoMoneda(venta.totalVendido) }}</td>
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
          <tr v-for="producto in productoMasVendido" :key="producto.nombre">
            <td>{{ producto.nombre }}</td>
            <td>{{ producto.cantidadVendida }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ventasPorDia, productoMasVendido, formatoMoneda } from '../api';

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
  