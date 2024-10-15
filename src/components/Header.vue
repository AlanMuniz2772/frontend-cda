<!-- src/components/Header.vue -->
<template>
    <header class="app-header">
      <div class="logo">
        <img src="/src/assets/logo.png" alt="Logo" class="logo-img" />
      </div>
      <button class="toggle-button" @click="toggleSidebar">
        {{ sidebarOpen ? 'Cerrar Sección' : 'Abrir Sección' }}
      </button>
    </header>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue';
  
  // Props para recibir el estado del sidebar y la función de alternar
  const props = defineProps({
    sidebarOpen: {
      type: Boolean,
      required: true,
    },
    toggleSidebar: {
      type: Function,
      required: true,
    },
  });
  </script>
  
  <style scoped>
/* Estilos de la barra superior */
.app-header {
  width: 100%;
  height: 50px; /* Reducimos un poco la altura */
  background-color: #34495e;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 25px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Estilo del logo */
.logo-img {
  height: 30px; /* Ajustamos el tamaño del logo */
  width: auto;
  transition: transform 0.3s;
}

.logo-img:hover {
  transform: scale(1.1);
}

/* Estilo del botón */
.toggle-button {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 8px 14px; /* Ajustamos el padding para reducir el tamaño del botón */
  cursor: pointer;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  transition: background-color 0.3s, transform 0.3s;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-right: 45px; /* Añadimos margen a la derecha para separarlo del borde */
}

.toggle-button:hover {
  background-color: #c0392b;
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}
</style>
