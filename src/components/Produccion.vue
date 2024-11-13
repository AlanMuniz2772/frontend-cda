<template>
  <div class="produccion">
    <h2>Producción</h2>

    <!-- Botón de agregar producto -->
    <button @click="showAddForm = true" class="add-product-btn">Agregar Producto</button>

    <!-- Tabla de productos -->
    <div class="table-container">
      <table class="product-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Costo</th>
            <th>Precio</th>
            <th></th> <!-- Columna para el ícono de edición -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="(producto, index) in productos" :key="index">
            <td>{{ producto.nombre }}</td>
            <td>{{ producto.costo }}</td>
            <td>{{ producto.precio }}</td>
            <td>
              <!-- Ícono de lápiz para editar producto -->
              <button @click="editProduct(producto)" class="edit-btn">✏️</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Paginación -->
      <div class="pagination">
        <button>Primera Página</button>
        <button v-for="page in totalPaginas" :key="page">{{ page }}</button>
        <button>Última Página</button>
      </div>
    </div>

    <!-- Formulario para agregar o editar producto -->
    <div v-if="showAddForm || showEditForm" class="product-form">
      <h3>{{ showEditForm ? 'Editar Producto' : 'Agregar Producto' }}</h3>

      <div class="form-group">
        <label>Nombre:</label>
        <input type="text" v-model="productForm.nombre" />
      </div>

      <div class="form-group">
        <label>Costo:</label>
        <input type="number" v-model="productForm.costo" />
      </div>

      <div class="form-group">
        <label>Utilidad:</label>
        <input type="number" v-model="productForm.utilidad" />
      </div>

      <div class="form-group">
        <label>Precio:</label>
        <input type="number" v-model="productForm.precio" />
      </div>

      <div class="form-group">
        <label>Disponible:</label>
        <input type="checkbox" v-model="productForm.disponible" />
      </div>

      <!-- Sección de insumos -->
      <div class="insumos-section">
        <h4>Insumos</h4>
        <div v-for="(insumo, index) in productForm.insumos" :key="index" class="insumo-item">
          <select v-model="insumo.nombre">
            <option v-for="insumoExistente in insumosExistentes" :key="insumoExistente" :value="insumoExistente">
              {{ insumoExistente }}
            </option>
          </select>
          <input type="number" v-model="insumo.cantidad" placeholder="Cantidad" />
          <select v-model="insumo.unidad">
            <option>gr</option>
            <option>ml</option>
            <option>piezas</option>
          </select>
          <button @click="removeInsumo(index)" class="remove-insumo-btn">Eliminar</button>
        </div>
        <button @click="addInsumo" class="add-insumo-btn">Agregar Insumo</button>
      </div>

      <!-- Botones de acción -->
      <div class="action-buttons">
        <button @click="saveProduct" class="save-btn">{{ showEditForm ? 'Guardar Cambios' : 'Agregar Producto' }}</button>
        <button @click="cancelForm" class="cancel-btn">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { fetchProductos, totalPaginas } from '../api';

interface Producto {
  nombre: string;
  costo: number;
  utilidad: number;
  precio: number;
  disponible: boolean;
  insumos: Array<{ nombre: string; cantidad: number; unidad: string }>;
}

// Variables reactivas para la lista de productos y el estado del formulario
const productos = ref<Producto[]>([]);
const insumosExistentes = ref(['Harina', 'Azúcar', 'Leche']); // Insumos disponibles
const totalPaginas = ref(6);

// Estados del formulario
const showAddForm = ref(false);
const showEditForm = ref(false);
const productForm = ref<Producto>({
  nombre: '',
  costo: 0,
  utilidad: 0,
  precio: 0,
  disponible: true,
  insumos: [],
});

// Función para obtener los productos al montar el componente
const obtenerProductos = async () => {
  productos.value = await fetchProductos();
};
onMounted(obtenerProductos);

// Función para mostrar el formulario de edición con datos del producto
const editProduct = (producto: Producto) => {
  productForm.value = { ...producto, insumos: [...producto.insumos] };
  showEditForm.value = true;
};

// Función para guardar producto (agregar o actualizar)
const saveProduct = () => {
  if (showAddForm.value) {
    productos.value.push({ ...productForm.value });
  } else if (showEditForm.value) {
    const index = productos.value.findIndex((p) => p.nombre === productForm.value.nombre);
    if (index !== -1) productos.value[index] = { ...productForm.value };
  }
  resetForm();
};

// Función para agregar un nuevo insumo al formulario de producto
const addInsumo = () => {
  productForm.value.insumos.push({ nombre: '', cantidad: 0, unidad: 'gr' });
};

// Función para eliminar un insumo del formulario de producto
const removeInsumo = (index: number) => {
  productForm.value.insumos.splice(index, 1);
};

// Función para cancelar y resetear el formulario
const cancelForm = () => resetForm();

// Función para resetear los datos del formulario
const resetForm = () => {
  productForm.value = { nombre: '', costo: 0, utilidad: 0, precio: 0, disponible: true, insumos: [] };
  showAddForm.value = false;
  showEditForm.value = false;
};
</script>

<style scoped>
/* Estilos de la tabla */
.produccion {
  padding: 20px;
}

.table-container {
  margin-top: 20px;
}

.product-table {
  width: 100%;
  border-collapse: collapse;
}

.product-table th, .product-table td {
  padding: 10px;
  border: 1px solid #0c0c0c;
  text-align: left;
}

.pagination {
  margin-top: 10px;
  display: flex;
  gap: 5px;
}

/* Botón "Agregar Producto" */
.add-product-btn {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 20px;
}

/* Formulario de producto */
.product-form {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}
.product-form h3 {
  margin-bottom: 15px;
  color: #333;
}
.form-group {
  margin-bottom: 15px;
}
.form-group label {
  display: block;
  font-weight: bold;
  color: #555;
}
.form-group input,
.form-group select {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

/* Sección de insumos */
.insumos-section {
  margin-top: 20px;
}
.insumo-item {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 10px;
}
.add-insumo-btn {
  padding: 6px 10px;
  background-color: #5cb85c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}
.remove-insumo-btn {
  padding: 6px 10px;
  background-color: #d9534f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

/* Botones de acción */
.action-buttons {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}
.save-btn {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.cancel-btn {
  padding: 10px 20px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
