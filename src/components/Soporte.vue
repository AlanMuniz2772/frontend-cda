<template>
    <div class="soporte">
      <h2>Soporte Técnico</h2>
      <p>Si tienes alguna duda o necesitas ayuda, puedes ponerte en contacto con nosotros:</p>
      
      <div class="contact-info">
        <h3>Correos de contacto:</h3>
        <ul>
          <li>
            <a href="mailto:l21051440@saltillo.tecnm.mx">
              l21051440@saltillo.tecnm.mx
            </a>
          </li>
          <li>
            <a href="mailto:l21051444@saltillo.tecnm.mx">
              l21051477@saltillo.tecnm.mx
            </a>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  // No hay lógica adicional necesaria para este componente por ahora.
  </script>
  
  <style scoped>
  .soporte {
    padding: 20px;
    font-family: Arial, sans-serif;
    background-color: #f9f9f9;
    border-radius: 8px;
    border: 1px solid #ddd;
    max-width: 600px;
    margin: 0 auto;
    text-align: center;
  }
  
  h2 {
    font-size: 24px;
    color: #333;
  }
  
  p {
    font-size: 16px;
    color: #555;
    margin-bottom: 20px;
  }
  
  .contact-info h3 {
    font-size: 20px;
    color: #444;
    margin-bottom: 10px;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  li {
    margin-bottom: 10px;
  }
  
  a {
    font-size: 16px;
    color: #007bff;
    text-decoration: none;
  }
  
  a:hover {
    text-decoration: underline;
    color: #0056b3;
  }
  </style>
  