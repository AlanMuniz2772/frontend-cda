<!-- src/components/Header.vue -->
<template>
  <header class="header">
    <button @click="toggleSidebar">Ocultar Menu</button>
    <h1>Mi Punto de venta</h1>
    <button @click="handleLogout">Cerrar sesión</button>
  </header>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';
import { logout } from '../store'; // Importa la función logout

const props = defineProps<{
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}>();

const router = useRouter();

// Función para cerrar sesión
const handleLogout = () => {
  logout(); // Actualiza el estado de autenticación en la tienda
  router.push('/login');
};
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: white; /* Cambiado a blanco */
  color: black; /* Cambiado a negro */
  display: flex;
  align-items: center;
  padding: 0 20px;
  z-index: 1000;
  justify-content: space-between; /* Asegura que los elementos estén bien distribuidos */
}

button {
  margin-right: 30px; /* Reduce el margen derecho del botón */
  padding: 5px 10px;
  cursor: pointer;
}

/* Título del encabezado */
.header h1 {
  margin: 0;
  font-size: 1.6em;
  font-weight: bold;
}
</style>
