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
  
  <script setup>
  import { ref } from 'vue';
  
  // Datos de ejemplo para Ventas Mensuales
  const ventasMensuales = ref([
    { mes: 'Producto A', enero: 500, febrero: 600, marzo: 700, abril: 800, mayo: 900, junio: 1000, julio: 1100, agosto: 1200, septiembre: 1300, octubre: 1400, noviembre: 1500, diciembre: 1600 },
    { mes: 'Producto B', enero: 400, febrero: 500, marzo: 600, abril: 700, mayo: 800, junio: 900, julio: 1000, agosto: 1100, septiembre: 1200, octubre: 1300, noviembre: 1400, diciembre: 1500 },
    { mes: 'Producto C', enero: 300, febrero: 400, marzo: 500, abril: 600, mayo: 700, junio: 800, julio: 900, agosto: 1000, septiembre: 1100, octubre: 1200, noviembre: 1300, diciembre: 1400 },
    { mes: 'Producto D', enero: 200, febrero: 300, marzo: 400, abril: 500, mayo: 600, junio: 700, julio: 800, agosto: 900, septiembre: 1000, octubre: 1100, noviembre: 1200, diciembre: 1300 },
    { mes: 'Producto E', enero: 100, febrero: 200, marzo: 300, abril: 400, mayo: 500, junio: 600, julio: 700, agosto: 800, septiembre: 900, octubre: 1000, noviembre: 1100, diciembre: 1200 },
    { mes: 'Producto F', enero: 50, febrero: 100, marzo: 150, abril: 200, mayo: 250, junio: 300, julio: 350, agosto: 400, septiembre: 450, octubre: 500, noviembre: 550, diciembre: 600 },
  ]);
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
  