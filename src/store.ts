// src/store.ts
import { reactive } from 'vue';

const store = reactive({
  isAuthenticated: localStorage.getItem('authenticated') === 'true',
});

export function login() {
  store.isAuthenticated = true;
  localStorage.setItem('authenticated', 'true');
}

export function logout() {
  store.isAuthenticated = false;
  localStorage.removeItem('authenticated');
}

export default store;
