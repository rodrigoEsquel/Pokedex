/* eslint-disable import/extensions */
import {
  mostrarDisplay,
  mostrarImagen,
  actualizarVisor,
  actualizarPadIzqDer,
  actualizarNavegacion,
  actualizarBotones,
  actualizarPadArrAbj,
} from './handlers.js';

export function configurarBusquedaInput(callbackBuscarPokemonNombre,callbackBuscarPokemonId) {
  const $inputText = document.querySelector('input');

  function buscarPokemon() {
    const tipoBusqueda = document.querySelector('#select').value;
    const regexNombrePokemon = /^[a-zA-Z]*$/;
    const regexIdPokemon = /^[0-9]*$/;
    const pokemon = $inputText.value.replace(/\s+/g, '').toLowerCase();

    if (tipoBusqueda === 'nombre' && regexNombrePokemon.test(pokemon)) {
      callbackBuscarPokemonNombre(pokemon)
    } else if (tipoBusqueda === 'id' && regexIdPokemon.test(pokemon)) {
      callbackBuscarPokemonId(pokemon)
    }
  }

  document.querySelector('#buscar').onclick = buscarPokemon;
  function enviarInput(event) {
    if (event.key == 'Enter') {  
      buscarPokemon();
    }
  }
  $inputText.addEventListener('keydown', enviarInput, true); // <-- Evento creado con addEventListener
}

export function configurarBotonReset(callbackListaPokemones) {
  document.querySelector('#reinicio').onclick = function reiniciarPokedex() {
    mostrarDisplay(['', '']);
    mostrarImagen('./img/pokebola.png');
    actualizarVisor('');
    actualizarPadIzqDer('');
    actualizarNavegacion(-1, callbackListaPokemones);
    actualizarBotones('');
    actualizarPadArrAbj('');
  };
}
