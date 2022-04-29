/* eslint-disable import/extensions */
import { obtenerDatosPokemon, obtenerListaPokemones } from './mapData.js';
import {
  actualizarUiPokemon,
  actualizarUiListaPokemon,
  inicializarUiPokedex,
  mostrarCargandoPokemon,
  mostrarCargandoDisplay,
} from './ui.js';

async function actualizaPokemon(pokemon) {
  mostrarCargandoPokemon();
  mostrarCargandoDisplay();
  const infoPokemon = await obtenerDatosPokemon(pokemon);
  actualizarUiPokemon(infoPokemon, actualizaPokemon);
}

async function actualizalistaPokemon(nroLista) {
  mostrarCargandoDisplay();
  const listaPokemon = await obtenerListaPokemones(nroLista);
  actualizarUiListaPokemon(listaPokemon, actualizaPokemon, actualizalistaPokemon);
}

export default function inicializarPokedex() {
  inicializarUiPokedex(actualizaPokemon, actualizalistaPokemon);
}
