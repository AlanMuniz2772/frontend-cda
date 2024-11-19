<template>
  <div class="reportes-container">
    <h2>Reportes de venta</h2>
    
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

    <div class="table-container">
      <h3>Ventas por Mes</h3>
      
      <table>
        <thead>
          <tr>
            <th>Mes</th>
            <th>Ventas Enero</th>
            <th>Ventas Febrero</th>
            <th>Ventas Marzo</th>
            <th>Ventas Abril</th>
            <th>Ventas Mayo</th>
            <th>Ventas Junio</th>
            <th>Ventas Julio</th>
            <th>Ventas Agosto</th>
            <th>Ventas Septiembre</th>
            <th>Ventas Octubre</th>
            <th>Ventas Noviembre</th>
            <th>Ventas Diciembre</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(venta, index) in ventasMensuales" :key="index">
            <td>{{ venta.mes }}</td>
            <td>{{ venta.enero }}</td>
            <td>{{ venta.febrero }}</td>
            <td>{{ venta.marzo }}</td>
            <td>{{ venta.abril }}</td>
            <td>{{ venta.mayo }}</td>
            <td>{{ venta.junio }}</td>
            <td>{{ venta.julio }}</td>
            <td>{{ venta.agosto }}</td>
            <td>{{ venta.septiembre }}</td>
            <td>{{ venta.octubre }}</td>
            <td>{{ venta.noviembre }}</td>
            <td>{{ venta.diciembre }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    
    
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { fetchVentasPorDia, fetchVentasPorMes } from '../api';


    // Variables reactivas para almacenar los datos de ventas por día y productos más vendidos
    const ventasPorDia = ref<Array<{ fecha: string; numeroVentas: number; totalVendido: number }>>([]);
    const ventasMensuales = ref<Array<{ mes: string; enero: number; febrero: number; marzo: number; abril: number; mayo: number; junio: number; julio: number; agosto: number; septiembre: number; octubre: number; noviembre: number; diciembre: number }>>([]);


    // Función para obtener los datos de ventas por día
    const obtenerVentasPorDia = async () => {
      ventasPorDia.value = await fetchVentasPorDia();
    };

    const obtenerVentasPorMes = async () => {
      ventasMensuales.value = await fetchVentasPorMes();
    };

    // Llamamos a ambas funciones cuando el componente se monta
    onMounted(() => {
      obtenerVentasPorDia();
      obtenerVentasPorMes();
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
  