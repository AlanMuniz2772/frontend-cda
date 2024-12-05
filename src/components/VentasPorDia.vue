<template>
    <div class="reportes-container">
      <h2>Reportes</h2>
      
      <!-- Tabla de Ventas por Día 6 x 6 -->
      <div class="table-container">
        <h3>Ventas por Día</h3>
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Número de Ventas</th>
              <th>Total Vendido</th>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Descuento</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="venta in ventasPorDia" :key="venta.fecha">
              <td>{{ venta.fecha }}</td>
              <td>{{ venta.numeroVentas }}</td>
              <td>{{ venta.totalVendido | formatoMoneda }}</td>
              <td>{{ venta.producto }}</td>
              <td>{{ venta.cantidad }}</td>
              <td>{{ venta.descuento }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Tabla de Resumen de Pagos 2 x 9 -->
      
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Datos de ejemplo para Ventas por Día
  const ventasPorDia = ref([
    { fecha: '2024-10-15', numeroVentas: 10, totalVendido: 1500, producto: 'Producto A', cantidad: 5, descuento: 10 },
    { fecha: '2024-10-16', numeroVentas: 20, totalVendido: 3000, producto: 'Producto B', cantidad: 8, descuento: 20 },
    { fecha: '2024-10-17', numeroVentas: 15, totalVendido: 2500, producto: 'Producto C', cantidad: 10, descuento: 15 },
  ]);
  
  // Datos de ejemplo para Resumen de Pagos
  const pagos = ref({
    efectivo: 2000,
    tarjeta: 1500,
    didi: 500,
    rappi: 700,
    uberEats: 800,
  });
  
  // Formatear el total vendido como moneda
  const formatoMoneda = (valor) => {
    return `$${valor.toFixed(2)}`;
  };
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
  