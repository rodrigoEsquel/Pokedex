import { obtenerDatosPokemon, obtenerListaPokemones } from './dataHandler';
import {
  manejarPokemon, manejarListaPokemon, inicializarInput, actualizarNavegacion, obtenerPokemonSeleccionado,
} from './ui';

function actualizaPKMN() { manejarPokemon(obtenerDatosPokemon); }
function actualizalistaPKMN() {
  const listaPokemon = obtenerListaPokemones(obtenerPokemonSeleccionado);
  manejarListaPokemon(listaPokemon);
}

function inicializarPokedex() {
  inicializarInput();
  actualizarNavegacion(actualizalistaPKMN);
}

inicializarPokedex();
