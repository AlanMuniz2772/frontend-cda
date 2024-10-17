<!-- src/components/Login.vue -->
<template>
    <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <input type="text" v-model="username" placeholder="Username" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { login } from '../store'; // Importa la función login
  
  // Estado para el username y el password
  const username = ref('');
  const password = ref('');
  const router = useRouter();
  
  // Credenciales predefinidas
  const validUsername = 'admin';
  const validPassword = '12345';
  
  // Función de manejo de login
  const handleLogin = () => {
    if (username.value === validUsername && password.value === validPassword) {
      // Si las credenciales son correctas, simula autenticación
      login(); // Actualiza el estado de autenticación en la tienda
      router.push('/'); // Redirige a la página principal
    } else {
      alert('Credenciales incorrectas. Inténtalo de nuevo.');
    }
  };
  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
  
  input {
    margin: 10px 0;
    padding: 10px;
    width: 200px;
  }
  
  button {
    padding: 10px 20px;
  }
  </style>
  