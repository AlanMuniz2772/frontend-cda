<template>
    <div class="ordenes-canceladas">
      <h2>Órdenes Canceladas</h2>
      <!-- Tabla de órdenes canceladas -->
      <div class="table-container">
        <table class="ordenes-table">
          <thead>
            <tr>
              <th>Orden</th>
              <th>Hora</th>
              <th>Pago</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="orden in ordenes" :key="orden.id">
              <td>{{ orden.id }}</td>
              <td>{{ orden.hora }}</td>
              <td>{{ orden.pago }}</td>
              <td>{{ orden.total }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Paginación -->
      <div class="pagination">
        <button @click="paginaAnterior" :disabled="paginaActual === 1">Anterior</button>
        <span>Página {{ paginaActual }} de {{ totalPaginas }}</span>
        <button @click="paginaSiguiente" :disabled="paginaActual === totalPaginas">Siguiente</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        ordenes: [
          { id: 1, hora: '4:14 PM', pago: 'Tarjeta Credito', total: '$80.00' },
          { id: 2, hora: '4:27 PM', pago: 'Efectivo', total: '$80.00' },
          { id: 3, hora: '4:28 PM', pago: 'Efectivo', total: '$160.00' },
          { id: 4, hora: '4:38 PM', pago: 'Tarjeta Credito', total: '$155.00' },
          { id: 5, hora: '4:40 PM', pago: 'Tarjeta Credito', total: '$160.00' },
          { id: 6, hora: '4:43 PM', pago: 'Efectivo', total: '$240.00' },
        ],
        paginaActual: 1,
        ordenesPorPagina: 3
      };
    },
    computed: {
      totalPaginas() {
        return Math.ceil(this.ordenes.length / this.ordenesPorPagina);
      },
      ordenesPaginadas() {
        const inicio = (this.paginaActual - 1) * this.ordenesPorPagina;
        const fin = inicio + this.ordenesPorPagina;
        return this.ordenes.slice(inicio, fin);
      }
    },
    methods: {
      paginaAnterior() {
        if (this.paginaActual > 1) {
          this.paginaActual--;
        }
      },
      paginaSiguiente() {
        if (this.paginaActual < this.totalPaginas) {
          this.paginaActual++;
        }
      }
    }
  };
  </script>
  
  <style>
  .ordenes-canceladas {
    padding: 20px;
  }
  
  .table-container {
    margin-top: 20px;
  }
  
  .ordenes-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .ordenes-table th, .ordenes-table td {
    border: 1px solid #141414;
    padding: 8px;
  }
  
  .ordenes-table th {
    background-color: #f2f2f2;
    text-align: left;
  }
  
  .pagination {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .pagination button {
    padding: 10px;
    background-color: red;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  .pagination button:disabled {
    background-color: #8b8989;
    cursor: not-allowed;
  }
  </style>
  