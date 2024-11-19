// src/api.ts
import { useRouter } from 'vue-router';
import { login, logout } from './store';
import datos from './tablas.json';
import { ref } from 'vue';
import axios from 'axios';

export const totalPaginas = ref(datos.produccion.totalPaginas);

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

// funcion para hacer login
export async function handleLogin(email: string, password: string) {
  const router = useRouter();

  try {
    await axios.get(BASE_URL + "/sanctum/csrf-cookie", {
      headers,
      timeout: 30000,
    });

    const response = await axios.post(BASE_URL + '/login', { email, password });
    
    if (response.status === 204 || response.status === 200) {
      login();
      router.push('/'); 
    } 
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 422) {
        alert(error.response.data.message);
      } else {
        alert("Error al procesar el inicio de sesión:");
        console.error('Error al procesar el inicio de sesión:', error);
      }
    } else {
      console.error('Error inesperado:', error);
    }
  }
}

// funcion para hacer registro de usuario
export async function handleRegister(name: string, email: string, password: string, password_confirmation: string) {
  const router = useRouter();

  try {
    await axios.get(BASE_URL + "/sanctum/csrf-cookie", {
      headers,
      timeout: 30000,
    });

    const response = await axios.post(BASE_URL + '/register', { name, email, password, password_confirmation});

    if (response.status === 204 || response.status === 200) {
      alert("Bienvenido "+name);
      login();
      router.push('/');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 422) {
        alert(error.response.data.message);
        console.log('Datos de registro inválidos:', error);
      } else {
        alert("Error al procesar el registro:");
        console.log('Error al procesar el registro:', error);
      }
    } else {
      console.log('Error inesperado:', error);
    }
  }
}


// funcion para cerrar sesion
export async function handleLogout() {
  const router = useRouter();

  try {
    const response = await axios.post(BASE_URL + '/logout', {}, { headers });

    if (response.status === 204 || response.status === 200) {
      logout();
      router.push('/login');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error al intentar cerrar sesión:', error);
    } else {
      console.error('Error inesperado:', error);
    }
  }
}

// Función para obtener ventas por día
export async function fetchVentasPorDia() {
  try {
    const response = await axios.get(`${BASE_URL}/api/reportes/ventas-por-dia`);
    console.log("Ventas por día:", response.data.ventasPorDia);
    return response.data.ventasPorDia; // Devuelve la lista de ventas
  } catch (error) {
    console.error("Error al obtener ventas por día:", error);
    return [];
  }
}

//funcion para obtner productos mas vendidos
export async function fetchProductosMasVendidos() {
  try {
    const response = await axios.get(`${BASE_URL}/api/reportes/productos-mas-vendidos`);
    console.log("Productos más vendidos:", response.data.productosMasVendidos);
    return response.data.productosMasVendidos; // Devuelve la lista de productos
  } catch (error) {
    console.error("Error al obtener productos más vendidos:", error);
    return [];
  }
}

//funcion para obtener todos los productos
export async function fetchProductos() {
  try {
    const response = await axios.get(`${BASE_URL}/api/data/productos`);
    console.log("Productos:", response.data.productos);
    return response.data.productos; // Devuelve la lista de productos
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return [];
  }
}

//funcion para obtener ventas por mes
export async function fetchVentasPorMes() {
  try {
    const response = await axios.get(`${BASE_URL}/api/reportes/ventas-por-mes`);
    console.log("Ventas por mes:", response.data.ventasMensuales);
    return response.data.ventasMensuales; // Devuelve la lista de ventas
  } catch (error) {
    console.error("Error al obtener ventas por mes:", error);
    return [];
  }
}

//funcion para obtener todos los inventarios
export async function fetchInventarios() {
  try {
    const response = await axios.get(`${BASE_URL}/api/data/inventarios`);
    console.log("Inventarios:", response.data.inventarios);
    return response.data.inventarios; // Devuelve la lista de inventarios
  } catch (error) {
    console.error("Error al obtener inventarios:", error);
    return [];
  }
}

//funcion para insertar un nuevo producto
export async function insertarProducto(
  id_tienda: number, 
  nombre: string, 
  costo: number, 
  utilidad: number, 
  precio: number, 
  is_available: boolean
) {
  try {
    const response = await axios.post(`${BASE_URL}/api/productos`, { 
      id_tienda, 
      nombre, 
      costo, 
      utilidad, 
      precio, 
      is_available 
    });
    
    console.log("Producto insertado con éxito, ID:", response.data.id);
    return response.data.id;  // Devuelve el ID del producto insertado
  } catch (error) {
    console.error("Error al insertar producto:", error);
    return null; // Retorna null en caso de error
  }
}

//funcion para insertar un nuevo insumo
export async function insertarInsumo(
  id_tienda: number, 
  nombre: string, 
  costo: number, 
  cantidad_tienda: number,
  unidad_medida: string,
  is_available: boolean
) {
  try {
    const response = await axios.post(`${BASE_URL}/api/insert/insumos`, { 
      id_tienda, 
      nombre, 
      costo, 
      cantidad_tienda,
      unidad_medida,
      is_available
    });
    
    console.log("Insumo insertado con éxito, ID:", response.data.id);
    return response.data;  // Devuelve el ID del insumo insertado
  } catch (error) {
    console.error("Error al insertar insumo:", error);
    return null; // Retorna null en caso de error
  }
}

//funcion para obtener todos los insumos
export async function fetchInsumos() {
  try {
    const response = await axios.get(`${BASE_URL}/api/data/insumos`);
    console.log("Insumos:", response.data.insumos);
    return response.data.insumos; // Devuelve la lista de insumos
  } catch (error) {
    console.error("Error al obtener insumos:", error);
    return [];
  }
}

//funcion para obtner los insumos de productos
export async function fetchInsumosProductos() {
  try {
    const response = await axios.get(`${BASE_URL}/api/data/insumos-productos`);
    console.log("Insumos de productos:", response.data.insumosProductos);
    return response.data.insumosProductos; // Devuelve la lista de insumos de productos
  } catch (error) {
    console.error("Error al obtener insumos de productos:", error);
    return [];
  }
}



