<template>
    <div class="ventas-container">
      <h2>Ventas por Mes</h2>
      
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
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted} from 'vue';
  import { fetchVentasPorMes } from '../api';

    const ventasMensuales = ref<Array<{ mes: string; enero: number; febrero: number; marzo: number; abril: number; mayo: number; junio: number; julio: number; agosto: number; septiembre: number; octubre: number; noviembre: number; diciembre: number }>>([]);

    const obtenerVentasPorMes = async () => {
      ventasMensuales.value = await fetchVentasPorMes();
    };

    onMounted(() => {
      obtenerVentasPorMes();
    });
  
  </script>
  
  <style scoped>
  /* Agrega aquí estilos para el componente si es necesario */
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }
  
  th {
    background-color: #f2f2f2;
  }
  </style>
  