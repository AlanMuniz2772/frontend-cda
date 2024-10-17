// src/main.ts
import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Importa el enrutador
import './style.css'; // Tu archivo de estilos globales

const app = createApp(App);

app.use(router); // Usa el enrutador
app.mount('#app');
