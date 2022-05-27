// eslint-disable-next-line import/extensions
import { cargarPokemon, cargarListaPokemon } from './api.js';
import Pokemon from '../clases/pokemon.js';
import ListaPokemon from "../clases/listaPokemon.js";

export async function mapearDatosPokemon(pokemon) {
  const datosPokemon = await cargarPokemon(pokemon);  
  return new Pokemon(datosPokemon);    
}

export async function mapearListaPokemones(pagina) {
  const lista = await cargarListaPokemon(pagina);
  return new ListaPokemon(pagina, lista);
}
