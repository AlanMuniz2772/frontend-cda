<template>
  <div class="sidebar">
    <!-- Menú lateral -->
    <ul class="menu">
      <li v-for="(section, index) in sections" :key="index" class="menu-item">
        <div class="section-title" @click="toggleSection(index)">
          {{ section.title }}
        </div>
        <transition name="slide">
          <!-- Submenú desplegable -->
          <ul v-show="activeSection === index" class="submenu">
            <li
              v-for="(subsection, subIndex) in section.subsections"
              :key="subIndex"
              class="submenu-item"
              @click="selectSubsection(subsection, section.title)"
            >
              {{ subsection }}
            </li>
          </ul>
        </transition>
      </li>
    </ul>
  </div>

  <!-- Contenido principal -->
  <div class="content">
    <Reportes v-if="selectedSubsection === 'Reportes'" />
    <VentasPorMes v-if="selectedSubsection === 'Venta de mes'" />
    <VentasPorDia v-if="selectedSubsection === 'Venta por dia'" />
    <Produccion v-if="selectedSubsection === 'Productos' && selectedSection === 'Produccion'" />
    <OrdenesDeCompra v-if="selectedSubsection === 'Ordenes de compra'" />
    <Inventarios v-if="selectedSubsection === 'Inventarios'" />
    <Usuarios v-if="selectedSubsection === 'Usuarios'" />
    <VentasPorProducto v-if="selectedSubsection === 'Ventas por producto'" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Reportes from './Reportes.vue';
import VentasPorMes from './VentasPorMes.vue';
import VentasPorDia from './VentasPorDia.vue';
import OrdenesDeCompra from './OrdenesDeCompra.vue';
import Produccion from './Produccion.vue';
import Inventarios from './Inventarios.vue';
import Usuarios from './Usuarios.vue';
import VentasPorProducto from './VentasPorProducto.vue';

const sections = ref([
  { title: 'Reportes', subsections: ['Reportes', 'Venta de mes', 'Venta por dia', 'Ventas por producto', 'Reporte de asistencia', 'Consumos', 'Historial Ordenes'] },
  { title: 'Produccion', subsections: ['Productos', 'Almacenes'] },
  { title: 'Ordenes', subsections: ['Ordenes de compra'] },
  { title: 'Inventarios', subsections: ['Inventarios', 'Inventarios programados', 'Ajustes de inventario'] },
  { title: 'Configuracion', subsections: ['Usuarios', 'Sucursales', 'Tipos de pagos', 'Tipos de servicios', 'Configuracion impresoras', 'Monedas Extranjeras'] },
  { title: 'Soporte', subsections: ['Soporte'] }
]);

const activeSection = ref<number | null>(null);
const selectedSubsection = ref<string | null>(null);
const selectedSection = ref<string | null>(null);

const toggleSection = (index: number) => {
  activeSection.value = activeSection.value === index ? null : index;
};

const selectSubsection = (subsection: string, section: string) => {
  selectedSubsection.value = subsection;
  selectedSection.value = section;
};
</script>

<style scoped>
/* Estilos del sidebar */
.sidebar {
  width: 250px;
  background-color: white; /* Cambiado a blanco */
  color: black; /* Cambiado a negro */
  height: calc(100vh - 50px);
  padding: 1em 0;
  position: fixed;
  top: 50px;
  left: 0;
  overflow-y: auto;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.3);
  z-index: 1000;
}

.menu {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.menu-item {
  margin-bottom: 1.5em;
}

.section-title {
  cursor: pointer;
  padding: 0.75em 1em;
  background-color: #f2f2f2; /* Cambiado a un tono claro */
  border-radius: 8px;
  transition: background-color 0.3s, box-shadow 0.3s;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: black; /* Cambiado a negro */
  font-size: 1rem;
  font-weight: 500;
}

.section-title:hover {
  background-color: #d9d9d9; /* Tono gris claro para hover */
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
}

.submenu {
  list-style-type: none;
  padding: 0.75em;
  margin-top: 0.75em;
  background-color: #e6e6e6; /* Fondo claro */
  border-radius: 6px;
  overflow: hidden;
}

.submenu-item {
  margin: 0.75em 0;
  padding-left: 1.5em;
  cursor: pointer;
  transition: background-color 0.3s, padding-left 0.3s;
  font-size: 0.9rem;
  color: black; /* Cambiado a negro */
}

.submenu-item:hover {
  background-color: #cccccc; /* Fondo claro para hover */
  padding-left: 2em;
  border-radius: 4px;
}

/* Animación suave para el desplegable */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}
.slide-enter-from,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
}
.slide-enter-to,
.slide-leave-from {
  max-height: 500px;
  opacity: 1;
}

/* Estilos para el contenido */
.content {
  background-color: #e0e0e0; /* Fondo claro para contenido */
  color: black; /* Cambiado a negro */
  padding: 0;
  width: calc(100vw - 250px);
  height: 109vh;
  position: absolute;
  top: 0;
  left: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.section-title-content {
  position: absolute;
  top: 10px;
  left: 10px;
  text-align: left;
  width: auto;
}

.subsection-content {
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: flex-start;
  height: 80%;
  padding-top: 20px;
  width: 100%;
}

h1, h2 {
  margin: 0;
  padding: 0;
  color: black; /* Cambiado a negro */
}

h2 {
  font-size: 1.5rem;
  text-align: center;
}

h1 {
  font-size: 2rem;
}
</style>
