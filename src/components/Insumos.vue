<template>
    <div class="insumos">
      <h2>Insumos</h2>
  
      <!-- Barra de búsqueda -->
      <div class="search-section">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Escriba nombre, código o unidad de medida"
          class="search-input"
        />
        <button @click="searchInsumos">Buscar</button>
      </div>
  
      <!-- Botón para agregar insumo -->
      <button @click="openAddInsumo" class="add-button">Agregar Insumo</button>
  
      <!-- Contenedor de tabla de insumos con scroll -->
      <div class="table-container">
        <table class="product-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Costo</th>
              <th>Cantidad en tienda</th>
              <th>Unidad de medida</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(insumo, index) in filteredInsumos" :key="index">
              <td>{{ insumo.nombre }}</td>
              <td>{{ insumo.costo }}</td>
              <td>{{ insumo.cantidadEnTienda }}</td>
              <td>{{ insumo.unidadDeMedida }}</td>
              <td>
                <button @click="editInsumo(insumo)" class="edit-button">✏️</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Modal para agregar/modificar insumo -->
      <div v-if="showModal" class="modal-overlay">
        <div class="modal">
          <h3>{{ isEditing ? "Modificar Insumo" : "Agregar Insumo" }}</h3>
          <label>Nombre:</label>
          <input v-model="currentInsumo.nombre" type="text" />
  
          <label>Costo:</label>
          <input v-model="currentInsumo.costo" type="number" />
  
          <label>Cantidad en tienda:</label>
          <input v-model="currentInsumo.cantidadEnTienda" type="number" />
  
          <label>Unidad de medida:</label>
          <input v-model="currentInsumo.unidadDeMedida" type="text" />
  
          <div class="modal-buttons">
            <button @click="saveInsumo">{{ isEditing ? "Guardar" : "Agregar" }}</button>
            <button @click="closeModal">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  interface Insumo {
    nombre: string;
    costo: number;
    cantidadEnTienda: number;
    unidadDeMedida: string;
  }

  const insumos = ref<Insumo[]>([
    { nombre: 'Harina', costo: 10, cantidadEnTienda: 100, unidadDeMedida: 'kg' },
    { nombre: 'Azúcar', costo: 15, cantidadEnTienda: 50, unidadDeMedida: 'kg' },
    { nombre: 'Leche', costo: 8, cantidadEnTienda: 20, unidadDeMedida: 'L' },
  ]);
  
  const searchQuery = ref('');
  const filteredInsumos = ref<Insumo[]>([...insumos.value]);
  const showModal = ref(false);
  const isEditing = ref(false);
  const currentInsumo = ref<Insumo>({ nombre: '', costo: 0, cantidadEnTienda: 0, unidadDeMedida: '' });
  
  const searchInsumos = () => {
    filteredInsumos.value = insumos.value.filter((insumo: Insumo) =>
      insumo.nombre.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  };
  
  const openAddInsumo = () => {
    isEditing.value = false;
    currentInsumo.value = { nombre: '', costo: 0, cantidadEnTienda: 0, unidadDeMedida: '' };
    showModal.value = true;
  };
  
  const editInsumo = (insumo: Insumo) => {
    isEditing.value = true;
    currentInsumo.value = { ...insumo };
    showModal.value = true;
  };
  
  const saveInsumo = () => {
    if (isEditing.value) {
      const index = insumos.value.findIndex(i => i.nombre === currentInsumo.value.nombre);
      if (index !== -1) insumos.value[index] = { ...currentInsumo.value };
    } else {
      insumos.value.push({ ...currentInsumo.value });
    }
    closeModal();
    searchInsumos();
  };
  
  const closeModal = () => {
    showModal.value = false;
  };
  </script>
  
  <style scoped>
  /* General padding for the insumos section */
  .insumos {
    padding: 20px;
  }
  
  /* Search section styling */
  .search-section {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  /* Style for the "Add" button */
  .add-button {
    margin-bottom: 20px;
    padding: 10px 15px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  /* Table container styling for scroll */
  .table-container {
    max-height: 300px; /* Fija el alto de la tabla */
    overflow-y: auto; /* Habilita el scroll vertical */
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-top: 10px;
  }
  
  /* Product table styling */
  .product-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  /* Table header and cell styling */
  .product-table th, .product-table td {
    padding: 10px;
    border: 1px solid #0c0c0c;
    text-align: left;
  }
  
  /* Edit button styling */
  .edit-button {
    background: none;
    border: none;
    cursor: pointer;
    color: #007bff;
  }
  
  /* Modal overlay styling */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  
  /* Modal container styling */
  .modal {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    width: 350px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  /* Label and input styling for modal */
  .modal label {
    display: block;
    margin-top: 10px;
    font-weight: bold;
  }
  
  .modal input[type="text"],
  .modal input[type="number"] {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  /* Modal button container styling */
  .modal-buttons {
    display: flex;
    gap: 10px;
    margin-top: 20px;
    justify-content: center;
  }
  
  /* Styling for "Add" and "Cancel" buttons in the modal */
  .modal-buttons button {
    flex: 1;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    font-size: 14px;
  }
  
  /* "Add" button styling */
  .modal-buttons .add-button {
    background-color: #007bff;
    color: #fff;
  }
  
  /* "Cancel" button styling */
  .modal-buttons .cancel-button {
    background-color: #ccc;
    color: #333;
  }
  
  /* Hover effects for better user experience */
  .modal-buttons .add-button:hover {
    background-color: #0056b3;
  }
  
  .modal-buttons .cancel-button:hover {
    background-color: #999;
  }
  </style>
  