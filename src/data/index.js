// eslint-disable-next-line import/extensions
import { cargarPokemon, cargarListaPokemon } from './api.js';

export async function mapearDatosPokemon(pokemon) {
  const datosPokemon = await cargarPokemon(pokemon);
  const imagen0 = datosPokemon.sprites.front_default;
  const imagen1 = datosPokemon.sprites.back_default;
  const imagen2 = datosPokemon.sprites.other['official-artwork'].front_default;
  return {
    imagenes: [imagen0, imagen1, imagen2],
    id: datosPokemon.id,
    nombre: datosPokemon.name,
    altura: datosPokemon.height,
    peso: datosPokemon.weight,
    tipo: datosPokemon.types,
  };
}

export async function mapearListaPokemones(pagina) {
  const lista = await cargarListaPokemon(pagina);
  const listaPokemones = [];
  lista.forEach((elem) => {
    listaPokemones.push(elem.name);
  });
  return {
    resultado: listaPokemones,
    pagina,
  };
}
