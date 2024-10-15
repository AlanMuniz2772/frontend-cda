<template>
  <div class="app-container">
    <!-- Barra superior -->
    <Header :sidebarOpen="sidebarOpen" :toggleSidebar="toggleSidebar" />

    <!-- Menú Lateral -->
    <Sidebar v-if="sidebarOpen" />

    <!-- Contenido Principal -->
    <div :class="['main-content', { 'sidebar-open': sidebarOpen }]">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Header from './components/Header.vue'; // Importa el componente Header
import Sidebar from './components/Sidebar.vue'; // Asegúrate de tener el sidebar también

// Estado para controlar la apertura/cierre del sidebar
const sidebarOpen = ref(true);

// Función para alternar el estado del sidebar
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};
</script>

<style scoped>
.app-container {
  display: flex;
  height: 100vh;
}

/* Estilos para el sidebar y el contenido principal se mantienen igual */
.sidebar {
  width: 250px; /* Ancho del sidebar */
  background-color: #2c3e50;
  color: white;
  height: calc(100vh - 50px); /* Altura ajustada para no sobrepasar la barra superior */
  padding: 1em 0;
  position: fixed;
  top: 50px; /* Coloca el menú lateral debajo de la barra superior */
  left: 0;
  z-index: 999; /* Aseguramos que el sidebar esté visible */
  overflow-y: auto; /* Habilita el scroll si es necesario */
}

.main-content {
  margin-left: 250px; /* Espacio para el menú lateral */
  padding: 70px 20px 20px; /* Ajuste para la barra superior */
  flex: 1;
  overflow-y: auto;
  transition: margin-left 0.3s ease; /* Animación suave para el contenido */
}

.sidebar-open + .main-content {
  margin-left: 250px;
}

.main-content:not(.sidebar-open) {
  margin-left: 0;
}
</style>
