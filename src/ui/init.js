import {
  mostrarDisplay,
  mostrarImagen,
  actualizarVisor,
  actualizarPadIzqDer,
  actualizarNavegacion,
  actualizarBotones,
  actualizarPadArrAbj,
} from './uiHandlers.js';

export function configurarBusquedaInput(callbackPokemon) {
  const $inputText = document.querySelector('input');
  function buscarPokemon() {
    const regexNombrePokemon = /^[a-zA-Z]*$/;
    const regexNumeroPokemon = /^[0-9]*$/;
    const pokemon = $inputText.value.replace(/\s+/g, '').toLowerCase();
    if (regexNombrePokemon.test(pokemon) || regexNumeroPokemon.test(pokemon)) {
      callbackPokemon(pokemon);
    }
  }
  document.querySelector('#buscar').onclick = buscarPokemon;
  function enviarInput(event) {
    if (event.key === 'Enter') {
      buscarPokemon();
    }
  }
  $inputText.addEventListener('keypress', enviarInput, false);
}

export function configurarBotonReset(callbackListaPokemones) {
  document.querySelector('#reinicio').onclick = function reiniciarPokedex() {
    mostrarDisplay(['', '']);
    mostrarImagen('./img/pokebola.png');
    actualizarVisor('');
    actualizarPadIzqDer('', () => {});
    actualizarNavegacion(-1, callbackListaPokemones);
    actualizarBotones('', () => {});
    actualizarPadArrAbj('', () => {});
  };
}
