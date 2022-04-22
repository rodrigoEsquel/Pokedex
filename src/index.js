import { obtenerDatosPokemon, obtenerListaPokemones } from './dataHandler';
import {
  actualizarUiPokemon, actualizarUiListaPokemon, inicializarPokedex,
} from './ui';

async function actualizaPokemon(pokemon) {
  const infoPokemon = await obtenerDatosPokemon(pokemon);
  actualizarUiPokemon(infoPokemon, obtenerDatosPokemon);
}

async function actualizalistaPokemon(nroLista) {
  const listaPokemon = await obtenerListaPokemones(nroLista);
  actualizarUiListaPokemon(listaPokemon, obtenerDatosPokemon, obtenerListaPokemones);
}

function Pokedex() {
  inicializarPokedex(actualizaPokemon, actualizalistaPokemon);
}

Pokedex();
