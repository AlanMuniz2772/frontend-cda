<template>
  <div class="sidebar">
    <!-- Iteramos sobre las secciones principales -->
    <ul class="menu">
      <li v-for="(section, index) in sections" :key="index" class="menu-item">
        <div class="section-title" @click="toggleSection(index)">
          {{ section.title }}
        </div>
        <!-- Añadimos la transición -->
        <transition name="slide">
          <!-- Submenú desplegable -->
          <ul v-show="activeSection === index" class="submenu">
            <li v-for="(subsection, subIndex) in section.subsections" :key="subIndex" class="submenu-item">
              {{ subsection }}
            </li>
          </ul>
        </transition>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Secciones del menú y sus subsecciones
const sections = ref([
  {
    title: 'Reportes',
    subsections: ['Reportes', 'Venta de mes', 'Venta por dia', 'Ventas por producto', 'Reporte de asistencia', 'Consumos','Historial Ordenes']
  },
  {
    title: 'Produccion',
    subsections: ['Productos', 'Almacenes']
  },
  {
    title: 'Ordenes',
    subsections: ['Ordenes de compra']
  },
  {
    title: 'Inventarios',
    subsections: ['Inventarios', 'Inventarios programados', 'Ajustes de inventario']
  },
  {
    title: 'Configuracion',
    subsections: ['Usuarios', 'Sucursales', 'Tipos de pagos', 'Tipos de servicios', 'Configuracion impresoras', 'Monedas Extranjeras']
  },
  {
    title: 'Soporte',
    subsections: ['Soporte']
  },
]);

// Estado para manejar la sección activa
const activeSection = ref<number | null>(null);

// Función para alternar la visibilidad de las subsecciones
const toggleSection = (index: number) => {
  if (activeSection.value === index) {
    activeSection.value = null; // Si se vuelve a hacer clic en la sección activa, se colapsa
  } else {
    activeSection.value = index; // Cambiamos a la sección activa seleccionada
  }
};
</script>

<style scoped>
/* Estilos del sidebar */
.sidebar {
  width: 250px;
  background-color: #2c3e50;
  color: white;
  height: calc(100vh - 50px); /* Restamos la altura del header */
  padding: 1em 0;
  position: fixed;
  top: 50px; /* Para alinearlo debajo del header */
  left: 0;
  overflow-y: auto;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.3); /* Sombra para dar profundidad */
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
  background-color: #34495e;
  border-radius: 8px;
  transition: background-color 0.3s, box-shadow 0.3s;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Sombra suave para el botón */
  color: white;
  font-size: 1rem;
  font-weight: 500;
}

.section-title:hover {
  background-color: #3b5369;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2); /* Sombra más fuerte al hacer hover */
}

.submenu {
  list-style-type: none;
  padding: 0.75em;
  margin-top: 0.75em;
  background-color: #1a252f;
  border-radius: 6px;
}

.submenu-item {
  margin: 0.75em 0;
  padding-left: 1.5em;
  cursor: pointer;
  transition: background-color 0.3s, padding-left 0.3s;
  font-size: 0.9rem;
  color: #ecf0f1;
}

.submenu-item:hover {
  background-color: #34495e;
  padding-left: 2em; /* Efecto de desplazamiento hacia la derecha al hacer hover */
  border-radius: 4px;
}

/* Animación de desplegar */
.slide-enter-active, .slide-leave-active {
  transition: max-height 0.3s ease, opacity 0.3s ease;
}

.slide-enter-from, .slide-leave-to {
  max-height: 0;
  opacity: 0;
}

.slide-enter-to, .slide-leave-from {
  max-height: 500px; /* Ajusta esto según la altura máxima estimada */
  opacity: 1;
}
</style>
