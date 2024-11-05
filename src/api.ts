// src/auth.ts
import axios from 'axios';
import { useRouter } from 'vue-router';
import { login } from './store'; // Importa la función login de la tienda
import datos from './tablas.json';
import { ref } from 'vue';

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  password: string;
}

export async function handleLogin(username: string, password: string) {
  const router = useRouter();

  try {
    const response = await axios.get<{ users: User[] }>('/src/datos.json'); // Ajusta la ruta
    const users = response.data.users;

    // Busca si el usuario existe y la contraseña es correcta
    const validUser = users.find(
      (user) => user.name === username && user.password === password
    );

    if (validUser) {
      login(); // Autentica en tu tienda
      router.push('/'); // Redirige a la página principal
    } else {
      alert('Credenciales incorrectas. Inténtalo de nuevo.');
    }
  } catch (error) {
    console.error('Error al cargar las credenciales:', error);
  }
}

//Componente Reportes
export const ventasPorDia = ref(datos.reportesVentas.ventasPorDia);
export const productoMasVendido = ref(datos.reportesVentas.productoMasVendido);

export const formatoMoneda = (valor: number): string => {
  return `$${valor.toFixed(2)}`;
};
//Componentes Produccion
export const productos = ref(datos.produccion.productos);
export const totalPaginas = ref(datos.produccion.totalPaginas);

