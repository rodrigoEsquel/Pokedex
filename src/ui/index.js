/* eslint-disable import/extensions */
import {
  mostrarDisplay,
  mostrarImagen,
  actualizarVisor,
  actualizarPadIzqDer,
  actualizarNavegacion,
  actualizarBotones,
  actualizarImagen,
} from './handlers.js';

import {
  configurarBusquedaInput,
  configurarBotonReset,
} from './init.js';

export function inicializarUiPokedex(callbackPokemon, callbackListaPokemones) {
  actualizarNavegacion(-1, callbackListaPokemones);
  configurarBusquedaInput(callbackPokemon,callbackPokemon);
  configurarBotonReset(callbackListaPokemones);
}

export function actualizarUiPokemon(datosPokemon, callbackPokemon) {
  mostrarDisplay([
    ['Nombre', datosPokemon.nombre],
    ['Altura', `${datosPokemon.altura / 10} m`],
    ['Peso', `${datosPokemon.peso / 10} kg`],
    ['Tipo', (datosPokemon.tipo[0].type.name + (datosPokemon.tipo.length > 1 ? `-${datosPokemon.tipo[1].type.name}` : ''))],
  ]);
  const { imagenes } = datosPokemon;
  actualizarImagen(imagenes);
  actualizarVisor(datosPokemon.id);
  actualizarPadIzqDer(datosPokemon.id, callbackPokemon);
}

export function actualizarUiListaPokemon(datosLista, callbackPokemon, callbackListaPokemones) {
  mostrarDisplay([
    [`${datosLista.pagina * 10 + 1}-${datosLista.resultado[0]}`, `${datosLista.pagina * 10 + 6}-${datosLista.resultado[5]}`],
    [`${datosLista.pagina * 10 + 2}-${datosLista.resultado[1]}`, `${datosLista.pagina * 10 + 7}-${datosLista.resultado[6]}`],
    [`${datosLista.pagina * 10 + 3}-${datosLista.resultado[2]}`, `${datosLista.pagina * 10 + 8}-${datosLista.resultado[7]}`],
    [`${datosLista.pagina * 10 + 4}-${datosLista.resultado[3]}`, `${datosLista.pagina * 10 + 9}-${datosLista.resultado[8]}`],
    [`${datosLista.pagina * 10 + 5}-${datosLista.resultado[4]}`, `${datosLista.pagina * 10 + 10}-${datosLista.resultado[9]}`],
  ]);
  actualizarBotones(datosLista.resultado, callbackPokemon);
  actualizarNavegacion(datosLista.pagina, callbackListaPokemones);
}

export function mostrarCargandoPokemon() {
  mostrarImagen('./img/pokebola.png');
}

export function mostrarCargandoDisplay() {
  mostrarDisplay([['Cargando...', '']]);
}
