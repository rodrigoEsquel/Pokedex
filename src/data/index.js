// eslint-disable-next-line import/extensions
import { cargarPokemon, cargarListaPokemon } from './api.js';
import { guardarLocalStorage, buscarLocalStorage } from "./localStorage";
import Pokemon from '../clases/pokemon.js';
import ListaPokemon from "../clases/listaPokemon.js";

export async function mapearDatosPokemon(pokemon) {
  if (buscarLocalStorage('poke-' + pokemon)) {
    return new Pokemon(buscarLocalStorage('poke-' + pokemon));      
  }
  const datosPokemon = await cargarPokemon(pokemon);  
  guardarLocalStorage(('poke-' + pokemon), datosPokemon);
  return new Pokemon(datosPokemon);    
}

export async function mapearListaPokemones(pagina) {
  if (buscarLocalStorage('lista-' + pagina)) {
    return new Pokemon(buscarLocalStorage('lista-' + pagina));      
  }
  const lista = await cargarListaPokemon(pagina);
  guardarLocalStorage(('lista-' + pagina), lista);
  return new ListaPokemon(pagina, lista);
}
