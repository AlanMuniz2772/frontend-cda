// src/auth.ts
import axios from 'axios';
import { useRouter } from 'vue-router';
import { login } from './store'; // Importa la función login de la tienda
import datos from './tablas.json';
import { ref } from 'vue';

// Interfaz para definir el tipo de datos de un usuario
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  password: string;
}

// Variable reactiva para almacenar los usuarios
export const usuarios = ref<User[]>([]);

// Función para cargar usuarios desde el archivo datos.json
export async function cargarUsuarios() {
  try {
    const response = await axios.get<{ users: User[] }>('/src/datos.json'); // Ajusta la ruta si es necesario
    usuarios.value = response.data.users;
  } catch (error) {
    console.error('Error al cargar usuarios:', error);
  }
}

// Función para manejar el inicio de sesión
export async function handleLogin(username: string, password: string) {
  const router = useRouter();

  // Carga los usuarios antes de validar el inicio de sesión
  await cargarUsuarios(); 

  try {
    // Busca si el usuario existe y la contraseña es correcta
    const validUser = usuarios.value.find(
      (user) => user.name === username && user.password === password
    );

    if (validUser) {
      login(); // Autentica en tu tienda
      router.push('/'); // Redirige a la página principal
    } else {
      alert('Credenciales incorrectas. Inténtalo de nuevo.');
    }
  } catch (error) {
    console.error('Error al procesar el inicio de sesión:', error);
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

// Cargar usuarios al importar el módulo
cargarUsuarios();
