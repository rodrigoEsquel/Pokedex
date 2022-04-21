import { generarUrlPokemon, generarUrlListaPokemon } from './query';

export async function cargarPokemon(pokemon) {
  return fetch(generarUrlPokemon(pokemon))
    .then((response) => response.json())
    .catch((error) => {
      // $inputText.value = 'Pokemon no encontrado';
      throw new Error(error);
    });
}

export async function cargarListaPokemon(pagina) {
  return fetch(generarUrlListaPokemon(pagina))
    .then((response) => response.json())
    .then((dataPkmn) => dataPkmn.results)
    .catch((error) => {
      throw new Error(error);
    });
}
