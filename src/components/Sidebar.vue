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
          <ul v-show="activeSections.includes(index)" class="submenu">
            <li v-for="(subsection, subIndex) in section.subsections" 
                :key="subIndex" 
                class="submenu-item"
                @click="selectSubsection(subsection, section.title)">
              {{ subsection }}
            </li>
          </ul>
        </transition>
      </li>
    </ul>
  </div>

  <!-- Cuadro negro para mostrar el título seleccionado -->
  <div class="content">
    <!-- Título de la sección (centrado arriba) -->
    <div class="section-title-content" v-if="selectedSection">
      <h2>{{ selectedSection }}</h2>
    </div>

    <!-- Título de la subsección (centrado) -->
    <div class="subsection-content">
      <h1 v-if="selectedSubsection">{{ selectedSubsection }}</h1>
      <p v-else>Selecciona una subsección</p>
    </div>
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

// Estado para manejar las secciones activas
const activeSections = ref<number[]>([]);

// Estado para manejar la subsección seleccionada y su sección
const selectedSubsection = ref<string | null>(null);
const selectedSection = ref<string | null>(null);

// Función para alternar la visibilidad de las subsecciones
const toggleSection = (index: number) => {
  const sectionIndex = activeSections.value.indexOf(index);
  if (sectionIndex !== -1) {
    activeSections.value.splice(sectionIndex, 1);
  } else {
    activeSections.value.push(index);
  }
};

// Función para seleccionar una subsección y su sección
const selectSubsection = (subsection: string, section: string) => {
  selectedSubsection.value = subsection;
  selectedSection.value = section;
};
</script>

<style scoped>
/* Estilos del sidebar */
.sidebar {
  width: 250px;
  background-color: #273b4e;
  color: white;
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
  background-color: #34495e;
  border-radius: 8px;
  transition: background-color 0.3s, box-shadow 0.3s;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: white;
  font-size: 1rem;
  font-weight: 500;
}

.section-title:hover {
  background-color: #698399;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
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
  padding-left: 2em;
  border-radius: 4px;
}

/* Estilos para el cuadro negro */
.content {
  background-color: #727699; /* Color del fondo */
  color: rgb(17, 17, 17); /* Color del texto */
  padding: 0; /* Eliminamos el padding para que abarque todo */
  width: calc(100vw - 250px); /* Ocupar todo el ancho menos la barra lateral */
  height: 109vh; /* Ocupar toda la altura de la ventana */
  position: absolute; /* Asegurar que se posicione correctamente */
  top: 0;
  left: 250px; /* Comienza donde termina la barra lateral */
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.section-title-content {
  position: absolute;
  top: 10px;
  left: 10px; /* Alinea el título de la categoría a la izquierda */
  text-align: left;
  width: auto;
}

.subsection-content {
  display: flex;
  flex-direction: column;
  align-items: left; /* Centra horizontalmente */
  justify-content: flex-start; /* Alinea el contenido en la parte superior */
  height: 80%; /* Abarca toda la altura disponible */
  padding-top: 20px; /* Ajusta la separación desde la parte superior */
  width: 100%; /* Ocupar todo el ancho disponible */
}

h1, h2 {
  margin: 0;
  padding: 0;
}

h2 {
  font-size: 1.5rem;
  text-align: center; /* Asegura que el título de la subcategoría esté centrado */
}

h1 {
  font-size: 2rem;
}

</style>
