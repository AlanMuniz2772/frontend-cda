<template>
    <div class="ventas-producto">
      <!-- Título -->
      <h2>Reporte Ventas Por Producto</h2>
  
      <!-- Barra de filtros -->
      <div class="filtros">
        <!-- Campo de categoría -->
        <div class="filtro">
          <label for="categoria">Categoría</label>
          <select id="categoria">
            <option>Seleccione una categoría</option>
            <!-- Añadir opciones de categorías aquí -->
          </select>
        </div>
  
        <!-- Campo de rango de fechas -->
        <div class="filtro">
          <label for="fecha">Rango de Fechas</label>
          <input type="date" />
          <input type="date" />
        </div>
  
        <!-- Selector de sucursal -->
        <div class="filtro">
          <label for="sucursal">Sucursal</label>
          <select id="sucursal">
            <option>Saltillo 3 - Pedro Figueroa</option>
            <!-- Añadir más sucursales aquí -->
          </select>
        </div>
  
        <!-- Botón de búsqueda -->
        <button class="filtro-boton">Aplicar Filtros</button>
      </div>
  
      <!-- Mensaje si no hay productos -->
      <div class="no-productos">
        No hay productos registrados para los criterios seleccionados.
      </div>
  
      <!-- Tabla de productos (agregar aquí si hay datos disponibles) -->
    </div>
  </template>
  
  <script setup lang="ts">
    // Importar y definir cualquier lógica adicional aquí si es necesario
  </script>
  
  <style scoped>
  .ventas-producto {
    padding: 20px;
  }
  
  h2 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  
  .filtros {
    display: flex;
    gap: 20px;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .filtro {
    display: flex;
    flex-direction: column;
  }
  
  .filtro label {
    font-size: 14px;
    margin-bottom: 5px;
    color: #000000;
  }
  
  .filtro select,
  .filtro input[type="date"] {
    padding: 8px;
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 200px;
  }
  
  .filtro-boton {
    padding: 10px 20px;
    font-size: 14px;
    color: white;
    background-color: #28a745;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .filtro-boton:hover {
    background-color: #218838;
  }
  
  .no-productos {
    font-size: 18px;
    color: #000000;
    text-align: center;
    margin-top: 20px;
  }
  </style>
  