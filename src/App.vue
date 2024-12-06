<!-- src/App.vue -->
<template>
  <div>
    <!-- Mostrar Header y Sidebar solo si está autenticado -->
    <div v-if="store.isAuthenticated" class="app-container">
      <!-- Barra superior -->
      <Header :sidebarOpen="sidebarOpen" :toggleSidebar="toggleSidebar" />

      <!-- Menú Lateral -->
      <Sidebar v-if="sidebarOpen" />

      <!-- Contenido Principal -->
      <div :class="['main-content', { 'sidebar-open': sidebarOpen }]">
        <router-view />
      </div>
    </div>

    <!-- Mostrar solo la vista del enrutador si no está autenticado -->
    <div v-else>
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Header from './components/Header.vue';
import Sidebar from './components/Sidebar.vue';
import store from './store';
import {login, isValidSession} from './store'; // Importa la tienda


onMounted(() => {
  if (isValidSession()) {
    login();
  }
  
});

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

/* Estilos para el sidebar y el contenido principal */
.sidebar {
  width: 250px;
  background-color: #394e75;
  color: white;
  height: calc(100vh - 50px);
  padding: 1em 0;
  position: fixed;
  top: 50px;
  left: 0;
  z-index: 999;
  overflow-y: auto;
}

.main-content {
  margin-left: 250px;
  padding: 70px 20px 20px;
  flex: 1;
  overflow-y: auto;
  transition: margin-left 0.3s ease;
}

.sidebar-open + .main-content {
  margin-left: 250px;
}

.main-content:not(.sidebar-open) {
  margin-left: 0;
}
</style>
