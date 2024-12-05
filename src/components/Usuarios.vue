<template>
  <div class="usuarios">
    <h1>Empleados</h1>
    <table v-if="!showEditForm">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Tipo</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in usuarios" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.rol_operacion }}</td>
          <td class="actions">
            <button class="btn red" @click="eliminarUsuario(user.id)">Eliminar</button>
            <button class="btn blue" @click="editarUsuario(user)">Modificar</button>
          </td>
        </tr>
      </tbody>
    </table>
    <button v-if="!showEditForm" class="btn green" @click="nuevoUsuario">Nuevo empleado</button>

    <!-- Formulario de edición -->
    <div v-else class="edit-form">
      <h2>Editar Usuario - {{ selectedUser.name }}</h2>
      <form @submit.prevent="guardarCambios">
        <div class="form-group">
          <label>Nombre:</label>
          <input type="text" v-model="selectedUser.name" />
        </div>
        <div class="form-group">
          <label>Contraseña:</label>
          <input type="password" v-model="selectedUser.password" placeholder="Capture la contraseña" />
        </div>
        <div class="form-group">
          <label>Rol de Operación:</label>
          <select v-model="selectedUser.rol_operacion">
            <option value="Cajero">Cajero</option>
            <option value="Supervisor">Supervisor</option>
            <option value="Gerente">Gerente</option>
          </select>
        </div>
        <div class="form-group">
          <label>Sueldo Semanal:</label>
          <input type="number" v-model="selectedUser.sueldo_semanal" />
        </div>
        <div class="form-group">
          <label>Bono Semanal:</label>
          <input type="number" v-model="selectedUser.bono_semanal" />
        </div>
        <div class="form-group">
          <label>Horas de Trabajo por Semana:</label>
          <input type="number" v-model="selectedUser.horas_trabajadas" />
        </div>
        <div class="buttons">
          <button class="btn blue" type="button" @click="cancelarEdicion">Cancelar</button>
          <button class="btn green" type="submit">Guardar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { fetchUsers, updateUser, deleteUser} from "../api";



// Estado para el formulario de edición
const showEditForm = ref(false);
const selectedUser = reactive({
  id: 0,
  name: "",
  password: "",
  rol_operacion: "",
  sueldo_semanal: 0,
  bono_semanal: 0,
  horas_trabajadas: 0,
});

interface Usuario {
  id: number;
  name: string;
  password: string;
  rol_operacion: string;
  sueldo_semanal: number;
  bono_semanal: number;
  horas_trabajadas: number;
}

const usuarios = ref<Usuario[]>([]);

const obtenerUsuarios = async() => {
  usuarios.value = await fetchUsers();
};  

// Funciones
const eliminarUsuario = (id: number) => {
  deleteUser(id);
  obtenerUsuarios();
};

const editarUsuario = (user: any) => {
  Object.assign(selectedUser, user); // Cargar datos del usuario seleccionado
  showEditForm.value = true;
};

const cancelarEdicion = () => {
  showEditForm.value = false;
};

const guardarCambios = () => {
  console.log(selectedUser);
  updateUser(selectedUser);
  obtenerUsuarios();
  showEditForm.value = false;
};

const nuevoUsuario = () => {
  console.log("Agregar nuevo usuario");
};

onMounted(() => {
  obtenerUsuarios();
});
</script>

<style scoped>
/* General */
.usuarios {
  padding: 20px;
  font-family: Arial, sans-serif;
}

/* Tabla */
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th, td {
  text-align: left;
  border: 1px solid #ccc;
  padding: 10px;
}

th {
  background-color: #f9f9f9;
}

.actions {
  display: flex;
  gap: 10px;
}

/* Botones */
.btn {
  padding: 5px 15px;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;
}

.btn.green {
  background-color: #4CAF50;
}

.btn.green:hover {
  background-color: #45a049;
}

.btn.red {
  background-color: #f44336;
}

.btn.red:hover {
  background-color: #d32f2f;
}

.btn.blue {
  background-color: #2196F3;
}

.btn.blue:hover {
  background-color: #1976d2;
}

/* Formulario de edición */
.edit-form {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input, .form-group select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.buttons {
  display: flex;
  justify-content: space-between;
}
</style>
