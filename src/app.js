/* eslint-disable import/extensions */
import { mapearDatosPokemon, mapearListaPokemones } from './map.js';
import {
  actualizarUiPokemon,
  actualizarUiListaPokemon,
  inicializarUiPokedex,
  mostrarCargandoPokemon,
  mostrarCargandoDisplay,
} from './ui/ui.js';

async function actualizaPokemon(pokemon) {
  mostrarCargandoPokemon();
  mostrarCargandoDisplay();
  const infoPokemon = await mapearDatosPokemon(pokemon);
  actualizarUiPokemon(infoPokemon, actualizaPokemon);
}

async function actualizalistaPokemon(nroLista) {
  mostrarCargandoDisplay();
  const listaPokemon = await mapearListaPokemones(nroLista);
  actualizarUiListaPokemon(listaPokemon, actualizaPokemon, actualizalistaPokemon);
}

export default function inicializarPokedex() {
  inicializarUiPokedex(actualizaPokemon, actualizalistaPokemon);
}
