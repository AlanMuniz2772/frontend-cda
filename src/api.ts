import { useRouter } from 'vue-router';
import { login } from './store';
import datos from './tablas.json';
import { ref } from 'vue';
import axios from 'axios';

axios.defaults.withCredentials = true;

const BASE_URL = 'http://localhost:8000';

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  password: string;
}

const headers: Record<string, string> = { 'Content-Type': 'application/json;charset=UTF-8' };

export const usuarios = ref<User[]>([]);

export async function handleLogin(email: string, password: string) {
  const router = useRouter();

  try {
    // Obtén el token CSRF del backend
    await axios.get(BASE_URL + "/sanctum/csrf-cookie", {
      headers,
      timeout: 30000,
    });

    // Usa la ruta completa del backend para el inicio de sesión
    const response = await axios.post(BASE_URL + '/login', { email, password });
    
    if (response.status === 204 || response.status === 200) {
      login(); 
      router.push('/'); 
    } 
  } catch (error) {
    if (axios.isAxiosError(error)) {
        // Aquí podemos usar error.response de manera segura
        if (error.response?.status === 422) {
            alert('Credenciales inválidas');
        } else {
            console.error('Error al procesar el inicio de sesión:', error);
        }
    } else {
        // Manejo del caso si no es un error de Axios
        console.error('Error inesperado:', error);
    }
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
