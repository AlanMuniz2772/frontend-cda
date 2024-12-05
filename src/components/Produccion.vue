<template>
  <div class="produccion">
    <h2>Producción</h2>
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
          <tr v-for="(producto, index) in productos" :key="producto.id">
            <td>{{ producto.nombre }}</td>
            <td>{{ producto.costo }}</td>
            <td>{{ producto.precio }}</td>
            <td>
              <!-- Botón de edición -->
              <button @click="editProduct(index)" class="edit-btn">Modificar</button>
            </td>
            <td>
              <!-- Botón de eliminación -->
              <button @click="deleteProduct(index)" class="cancel-btn">Eliminar</button>
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
        <input type="checkbox" v-model="productForm.is_available" />
      </div>

      <!-- Sección de insumos -->
      <div class="insumos-section">
        <h4>Insumos</h4>
        <div v-for="(insumo, index) in productForm.insumos" :key="index" class="insumo-item">
          <input type="text" v-model="insumo.nombre" placeholder="Nombre del insumo" />
          <input type="number" v-model="insumo.cantidad" placeholder="Cantidad" />
          <select v-model="insumo.unidad_medida">
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
import { ref, onMounted } from 'vue';
import {
  fetchProductos,
  addProducto,
  updateProducto,
  deleteProducto
} from '../api';

interface Insumo {
  id: number;
  nombre: string;
  cantidad: number;
  unidad_medida: string;
}

interface Producto {
  id: number;
  nombre: string;
  costo: number;
  utilidad: number;
  precio: number;
  is_available: boolean;
  insumos: Insumo[];
}

// Estados reactivos
const productos = ref<Producto[]>([]);
const showAddForm = ref(false);
const showEditForm = ref(false);
const editingIndex = ref<number | null>(null);

const productForm = ref<Producto>({
  id: 0,
  nombre: '',
  costo: 0,
  utilidad: 0,
  precio: 0,
  is_available: true,
  insumos: []
});

// Cargar productos e insumos desde la base de datos al montar el componente
onMounted(async () => {
  try {
    productos.value = await fetchProductos();
    console.log(productos.value);
  } catch (error) {
    console.error('Error al cargar datos:', error);
  }
});



// Activar modo de edición
const editProduct = async (index: number) => {
  editingIndex.value = index;
  const producto = productos.value[index];
  productForm.value = { ...producto };
  
  showEditForm.value = true;
  showAddForm.value = false;
};

// Guardar cambios o agregar un nuevo producto
const saveProduct = async () => {
  try {
    if (showAddForm.value) {
      const nuevoProducto = await addProducto(productForm.value);
      productos.value.push(nuevoProducto);
    } else if (showEditForm.value && editingIndex.value !== null) {
      await updateProducto(productForm.value);
      productos.value[editingIndex.value] = { ...productForm.value };
    }
    resetForm();
  } catch (error) {
    console.error('Error al guardar producto:', error);
  }
};

// Eliminar producto
const deleteProduct = async (index: number) => {
  try {
    const producto = productos.value[index];
    await deleteProducto(producto.id);
    productos.value.splice(index, 1);
  } catch (error) {
    console.error('Error al eliminar producto:', error);
  }
};

// Agregar insumo al formulario
const addInsumo = () => {
  productForm.value.insumos.push({ id: 0, nombre: '', cantidad: 0, unidad_medida: 'gr' });
};

// Eliminar insumo del formulario
const removeInsumo = (index: number) => {
  productForm.value.insumos.splice(index, 1);
};

// Cancelar formulario
const cancelForm = () => resetForm();

// Restablecer el formulario
const resetForm = () => {
  productForm.value = { id: 0, nombre: '', costo: 0, utilidad: 0, precio: 0, is_available: true, insumos: [] };
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
