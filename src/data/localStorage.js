export function guardarLocalStorage(key,value) {
  return localStorage.setItem(key,JSON.stringify(value));
}

export function buscarLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}