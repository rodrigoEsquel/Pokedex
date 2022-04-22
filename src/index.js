/* eslint-disable import/extensions */
import { obtenerDatosPokemon, obtenerListaPokemones } from './dataHandler.js';
import {
  actualizarUiPokemon,
  actualizarUiListaPokemon,
  inicializarPokedex,
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

function Pokedex() {
  inicializarPokedex(actualizaPokemon, actualizalistaPokemon);
}

Pokedex();
