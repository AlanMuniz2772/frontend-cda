<template>
  <div class="reabastecimiento">
    <h2>Proyección Reabastecimiento para: 24/11/2024</h2>
    <button @click="descargar" class="descargar-btn">Descargar</button>

    <!-- Tabla de insumos -->
    <div class="table-container">
      <table class="insumo-table">
        <thead>
          <tr>
            <th>Insumo</th>
            <th>Reabastecer</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Leche Deslactosada</td>
            <td>30</td>
          </tr>
          <tr>
            <td>Leche Entera</td>
            <td>30</td>
          </tr>
          <tr>
            <td>Leche Light</td>
            <td>30</td>
          </tr>
          <tr>
            <td>Perlas Explosivas. Sabor Cereza</td>
            <td>30</td>
          </tr>
          <tr>
            <td>Perlas Explosivas. Sabor Mango</td>
            <td>30</td>
          </tr>
          <tr>
            <td>Perlas Explosivas. Sabor Yogurt</td>
            <td>30</td>
          </tr>
          <tr>
            <td>Pulpa Fresa</td>
            <td>30</td>
          </tr>
          <tr>
            <td>Pulpa Mango</td>
            <td>30</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    descargar() {
      // Lógica para descargar el archivo
    }
  }
}
</script>

<style>
.reabastecimiento {
  padding: 20px;
}

.descargar-btn {
  background-color: red;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
}

.table-container {
  margin-top: 20px;
}

.insumo-table {
  width: 100%;
  border-collapse: collapse;
}

.insumo-table th, .insumo-table td {
  border: 1px solid #1f1e1e;
  padding: 8px;
}

.insumo-table th {
  background-color: #f2f2f2;
  text-align: left;
}
</style>
