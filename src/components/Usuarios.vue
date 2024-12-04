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
          <td>{{ user.type }}</td>
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
          <input type="password" placeholder="Capture la contraseña" />
        </div>
        <div class="form-group">
          <label>Rol de Operación:</label>
          <select v-model="selectedUser.type">
            <option value="Cajero">Cajero</option>
            <option value="Supervisor">Supervisor</option>
            <option value="Gerente">Gerente</option>
          </select>
        </div>
        <div class="form-group">
          <label>Sueldo Semanal:</label>
          <input type="number" v-model="selectedUser.weeklySalary" />
        </div>
        <div class="form-group">
          <label>Bono Semanal:</label>
          <input type="number" v-model="selectedUser.weeklyBonus" />
        </div>
        <div class="form-group">
          <label>Horas de Trabajo por Semana:</label>
          <input type="number" v-model="selectedUser.weeklyHours" />
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
import { reactive, ref } from "vue";

// Datos de prueba
const usuarios = reactive([
  { id: 1, name: "Emmanuel V", type: "Cajero", weeklySalary: 1600, weeklyBonus: 200, weeklyHours: 6 },
  { id: 2, name: "María G", type: "Supervisor", weeklySalary: 2000, weeklyBonus: 300, weeklyHours: 8 },
  { id: 3, name: "Luis P", type: "Gerente", weeklySalary: 3000, weeklyBonus: 500, weeklyHours: 10 },
]);

// Estado para el formulario de edición
const showEditForm = ref(false);
const selectedUser = reactive({
  id: 0,
  name: "",
  type: "",
  weeklySalary: 0,
  weeklyBonus: 0,
  weeklyHours: 0,
});

// Funciones
const eliminarUsuario = (id: number) => {
  console.log(`Eliminar usuario con ID: ${id}`);
};

const editarUsuario = (user: any) => {
  Object.assign(selectedUser, user); // Cargar datos del usuario seleccionado
  showEditForm.value = true;
};

const cancelarEdicion = () => {
  showEditForm.value = false;
};

const guardarCambios = () => {
  console.log("Cambios guardados:", selectedUser);
  showEditForm.value = false;
};

const nuevoUsuario = () => {
  console.log("Agregar nuevo usuario");
};
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
