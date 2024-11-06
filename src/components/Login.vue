<!-- src/components/Login.vue -->
<template>
    <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="submitLogin">
        <input type="text" v-model="email" placeholder="Email" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { handleLogin } from '../api';
  
  const email = ref('');
  const password = ref('');
  

  function submitLogin() {
    handleLogin(email.value, password.value);
  }
  
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
  