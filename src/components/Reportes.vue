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

      <!-- Gráfica de Ventas por Día -->
      <canvas ref="chartVentasPorDia" width="400" height="200"></canvas>
    </div>

    <!-- Tabla de Ventas por Mes -->
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

      <!-- Gráfica de Ventas por Mes -->
      <canvas ref="chartVentasPorMes" width="400" height="200"></canvas>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import Chart from 'chart.js/auto';
import { fetchVentasPorDia, fetchVentasPorMes } from '../api';

const ventasPorDia = ref<Array<{ fecha: string; numeroVentas: number; totalVendido: number }>>([]);
const ventasMensuales = ref<Array<{ mes: string; enero: number; febrero: number; marzo: number; abril: number; mayo: number; junio: number; julio: number; agosto: number; septiembre: number; octubre: number; noviembre: number; diciembre: number }>>([]);

const obtenerVentasPorDia = async () => {
  ventasPorDia.value = await fetchVentasPorDia();
};

const obtenerVentasPorMes = async () => {
  ventasMensuales.value = await fetchVentasPorMes();
};

const chartVentasPorDia = ref<HTMLCanvasElement | null>(null);
const chartVentasPorMes = ref<HTMLCanvasElement | null>(null);

let chartInstanceDia: Chart | null = null;
let chartInstanceMes: Chart | null = null;

// Función para inicializar la gráfica de ventas por día
const initChartVentasPorDia = () => {
  if (chartVentasPorDia.value) {
    chartInstanceDia?.destroy(); // Destruir la gráfica previa si existe
    const fechas = ventasPorDia.value.map((venta) => venta.fecha);
    const numeros = ventasPorDia.value.map((venta) => venta.numeroVentas);

    chartInstanceDia = new Chart(chartVentasPorDia.value, {
      type: 'bar',
      data: {
        labels: fechas,
        datasets: [
          {
            label: 'Ventas por Día',
            data: numeros,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      },
    });
  }
};

// Función para inicializar la gráfica de ventas por mes
const initChartVentasPorMes = () => {
  if (chartVentasPorMes.value) {
    chartInstanceMes?.destroy();
    const meses = ventasMensuales.value.map((venta) => venta.mes);
    const totales = ventasMensuales.value.map(
      (venta) => venta.enero + venta.febrero + venta.marzo + venta.abril + venta.mayo + venta.junio + venta.julio + venta.agosto + venta.septiembre + venta.octubre + venta.noviembre + venta.diciembre
    );

    chartInstanceMes = new Chart(chartVentasPorMes.value, {
      type: 'line',
      data: {
        labels: meses,
        datasets: [
          {
            label: 'Ventas Totales por Mes',
            data: totales,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
    });
  }
};

onMounted(() => {
  obtenerVentasPorDia();
  obtenerVentasPorMes();
});

watch(ventasPorDia, initChartVentasPorDia);
watch(ventasMensuales, initChartVentasPorMes);
</script>



<style scoped>
  canvas {
  max-width: 100%; /* La gráfica se ajustará al tamaño del contenedor */
  height: auto; /* Mantener proporciones */
}

  .reportes-container {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px; /* Espacio entre las tablas y las gráficas */
  height: 100vh; /* Altura del contenedor completa */
  overflow-y: auto; /* Habilitar scroll si es necesario */
  background-color: #f8f9fa; /* Fondo más uniforme */
}
  
  h2, h3 {
    color: #2c3e50;
  }
  
 .table-container {
  width: 100%; /* Ajustar el ancho al contenedor */
  max-width: 1200px; /* Limitar ancho máximo para que no se vea muy expandido */
  overflow-x: auto; /* Scroll horizontal si la tabla es muy ancha */
  background: white; /* Asegurar fondo blanco */
  border-radius: 8px; /* Bordes redondeados */
  padding: 10px; /* Espaciado interno */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra sutil */
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
  