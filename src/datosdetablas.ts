import { ref } from 'vue';
import datos from './reportes.json';

export const ventasPorDia = ref(datos.ventasPorDia);
export const productoMasVendido = ref(datos.productoMasVendido);

export const formatoMoneda = (valor: number): string => {
  return `$${valor.toFixed(2)}`;
};
