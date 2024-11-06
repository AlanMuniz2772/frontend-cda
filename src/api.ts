// src/auth.ts
import { useRouter } from 'vue-router';
import { login } from './store'; // Importa la función login de la tienda
import datos from './tablas.json';
import { ref } from 'vue';

import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;


// Interfaz para definir el tipo de datos de un usuario
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  password: string;
}

const headers: Record<string, string> = { 'Content-Type': 'application/json;charset=UTF-8' };

// Variable reactiva para almacenar los usuarios
export const usuarios = ref<User[]>([]);

// Función para manejar el inicio de sesión con solicitud al backend
export async function handleLogin(email: string, password: string) {
  const router = useRouter();

  try {
    // Obtén el token CSRF del backend
    
    await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
      headers: Object.keys(headers).length > 0 ? headers : undefined,
      timeout: 30000,
      withCredentials: true,
      withXSRFToken: true,
   });

    
    // Usa la ruta completa del backend
    const response = await axios.post('http://localhost:8000/login', { email, password });
    console.log(response);
    if (response.status === 204 || response.status === 200) {
      login(); // Marca como autenticado en la tienda
      router.push('/'); // Redirige a la página principal
    } else {
      alert('Credenciales incorrectas. Inténtalo de nuevo.');
    }
  } catch (error) {
    console.log(error);
    console.error('Error al procesar el inicio de sesión:', error);
    alert('Hubo un problema al intentar iniciar sesión. Por favor, intenta más tarde.');
  }
}

// Componentes de Reportes (Datos extraídos de datos de ventas)
export const ventasPorDia = ref(datos.reportesVentas.ventasPorDia);
export const productoMasVendido = ref(datos.reportesVentas.productoMasVendido);

export const formatoMoneda = (valor: number): string => {
  return `$${valor.toFixed(2)}`;
};

// Componentes de Producción (Datos extraídos de datos de producción)
export const productos = ref(datos.produccion.productos);
export const totalPaginas = ref(datos.produccion.totalPaginas);


