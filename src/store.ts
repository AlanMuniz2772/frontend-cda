// src/store.ts
import { reactive } from 'vue';

const store = reactive({
  isAuthenticated: localStorage.getItem('authenticated') === 'true',
});

export function login() {
  store.isAuthenticated = true;
  sessionStorage.setItem('authenticated', 'true');
}

export function logout() {
  store.isAuthenticated = false;
  sessionStorage.removeItem('authenticated');
}

export function isValidSession(){
  return sessionStorage.getItem('authenticated')
}

export default store;
