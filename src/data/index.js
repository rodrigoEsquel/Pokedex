// eslint-disable-next-line import/extensions
import { cargarPokemon, cargarListaPokemon } from './api.js';
import { guardarLocalStorage, buscarLocalStorage } from "./localStorage.js";
import Pokemon from '../classes/Pokemon.js';
import ListaPokemon from "../classes/ListaPokemon.js";

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
    return new ListaPokemon(pagina, (buscarLocalStorage('lista-' + pagina)));      
  }
  const lista = await cargarListaPokemon(pagina);
  guardarLocalStorage(('lista-' + pagina), lista);
  return new ListaPokemon(pagina, lista);
}
