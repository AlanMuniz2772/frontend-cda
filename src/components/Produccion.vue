<template>
  <div class="produccion">
    <h2>Productos</h2>
    <button @click="showAddForm = true; showEditForm = false" class="add-product-btn">Agregar Producto</button>

    <!-- Tabla de productos -->
    <div class="table-container">
      <table class="product-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Costo</th>
            <th>Precio</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(producto, index) in productos" :key="index">
            <td>{{ producto.nombre }}</td>
            <td>{{ producto.costo }}</td>
            <td>{{ producto.precio }}</td>
            <td>
              <!-- Botón de edición -->
              <button @click="editProduct(index)" class="edit-btn">Modificar</button>
            </td>
            <td>
              <!-- Botón de eliminación -->
              <button class="cancel-btn">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Formulario de agregar o editar producto -->
    <div v-if="showAddForm || showEditForm" class="product-form">
      <h3>{{ showEditForm ? 'Modificar Producto' : 'Agregar Producto' }}</h3>

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

      <div class="action-buttons">
        <button @click="saveProduct" class="save-btn">{{ showEditForm ? 'Guardar Cambios' : 'Agregar Producto' }}</button>
        <button @click="cancelForm" class="cancel-btn">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Producto {
  nombre: string;
  costo: number;
  utilidad: number;
  precio: number;
  disponible: boolean;
  insumos: Array<{ nombre: string; cantidad: number; unidad: string }>;
}

// Datos iniciales de productos
const productos = ref<Producto[]>([
  {
    nombre: 'Producto 1',
    costo: 10,
    utilidad: 20,
    precio: 30,
    disponible: true,
    insumos: [
      { nombre: 'Harina', cantidad: 500, unidad: 'gr' },
      { nombre: 'Azúcar', cantidad: 200, unidad: 'gr' }
    ]
  },
  {
    nombre: 'Producto 2',
    costo: 15,
    utilidad: 25,
    precio: 40,
    disponible: false,
    insumos: [
      { nombre: 'Leche', cantidad: 1, unidad: 'litro' }
    ]
  }
]);

const insumosExistentes = ref(['Harina', 'Azúcar', 'Leche', 'Mantequilla']); // Insumos disponibles
const showAddForm = ref(false);
const showEditForm = ref(false);
const editingIndex = ref<number | null>(null); // Índice del producto en edición

// Objeto para el formulario del producto
const productForm = ref<Producto>({
  nombre: '',
  costo: 0,
  utilidad: 0,
  precio: 0,
  disponible: true,
  insumos: []
});

// Función para activar el modo de edición y rellenar el formulario
const editProduct = (index: number) => {
  editingIndex.value = index;
  productForm.value = { ...productos.value[index], insumos: [...productos.value[index].insumos] };
  showEditForm.value = true;
  showAddForm.value = false;
};

// Función para guardar cambios o agregar un nuevo producto
const saveProduct = () => {
  if (showAddForm.value) {
    // Agregar producto
    productos.value.push({ ...productForm.value });
  } else if (showEditForm.value && editingIndex.value !== null) {
    // Guardar cambios en el producto existente
    productos.value[editingIndex.value] = { ...productForm.value };
  }
  resetForm();
};

// Función para agregar un insumo al producto actual en el formulario
const addInsumo = () => {
  productForm.value.insumos.push({ nombre: '', cantidad: 0, unidad: 'gr' });
};

// Función para eliminar un insumo del producto actual en el formulario
const removeInsumo = (index: number) => {
  productForm.value.insumos.splice(index, 1);
};

// Función para cancelar el formulario de edición/agregado
const cancelForm = () => resetForm();

// Función para restablecer el formulario
const resetForm = () => {
  productForm.value = { nombre: '', costo: 0, utilidad: 0, precio: 0, disponible: true, insumos: [] };
  showAddForm.value = false;
  showEditForm.value = false;
  editingIndex.value = null;
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
