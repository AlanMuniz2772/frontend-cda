<!-- src/components/Login.vue -->
<template>
  <div class="login-container">
    <div class="form-box">
      <div>
        <button class="tab-button" :class="{ active: mode === 'signup' }" @click="setMode('signup')">Registro</button>
        <button class="tab-button" :class="{ active: mode === 'login' }" @click="setMode('login')">Inicio sesion</button>
      </div>
      <div class="header-text">{{ mode === 'signup' ? "Sign Up for Free" : "Log In" }}</div>
      <form @submit.prevent="submitForm">
        <!-- Campos de Sign Up -->
        <div v-if="mode === 'signup'">
          <input type="text" v-model="name" placeholder="First Name" required />
          <input type="text" v-model="lastName" placeholder="Last Name" required />
          <input type="email" v-model="email" placeholder="Email Address" required />
          <input
            type="password"
            v-model="password"
            placeholder="Set A Password"
            required
            minlength="8"
          />
          <input
            type="password"
            v-model="confirmPassword"
            placeholder="Confirm Password"
            required
            minlength="8"
          />
        </div>

        <!-- Campos de Log In -->
        <div v-else>
          <input type="text" v-model="username" placeholder="Usuario" required />
          <input type="password" v-model="password" placeholder="Password" required minlength="8" />
        </div>

        <button type="submit" class="submit-button">{{ mode === 'signup' ? "GET STARTED" : "LOGIN" }}</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { handleLogin, handleRegister } from '../api';
import { useRouter } from 'vue-router';

const router = useRouter();
const mode = ref<'login' | 'signup'>('login'); // Nueva propiedad mode para alternar
const name = ref('');
const lastName = ref('');
const email = ref('');
const username = ref('');
const password = ref('');
const confirmPassword = ref('');
const fullName = ref('');

function setMode(selectedMode: 'login' | 'signup') {
  mode.value = selectedMode;
}

function submitForm() {
  if (mode.value === 'signup') {
    fullName.value = `${name.value} ${lastName.value}`;
    handleRegister(fullName.value, email.value, password.value, confirmPassword.value);
  } else {
    handleLogin(username.value, password.value, router);
  }
}
</script>

<style scoped>
/* Estilo para centrar el formulario en la pantalla */
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #242424;
}

/* Estilo del contenedor del formulario */
.form-box {
  background-color: #2c3e50;
  padding: 30px;
  width: 300px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

/* Estilo de los botones de pestañas */
.tab-button {
  background-color: #3cc185;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  margin: 5px;
  width: 100px;
}

.tab-button.active {
  border: 2px solid white;
}

input {
  margin: 10px 0;
  padding: 10px;
  width: calc(100% - 20px);
  border: none;
  border-radius: 5px;
  box-sizing: border-box;
}

input.invalid {
  border: 2px solid #e74c3c;
}

.error-message {
  color: #e74c3c;
  font-size: 0.9em;
}

.submit-button {
  background-color: #3cc185;
  color: white;
  padding: 10px;
  width: 100%;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 15px;
}

.header-text {
  color: white;
  font-size: 1.2em;
  margin-bottom: 15px;
}
</style>
