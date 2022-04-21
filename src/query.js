const baseAPI = 'https://pokeapi.co/api/v2/pokemon/';

function generarUrlPokemon(pokemon) {
  return baseAPI + pokemon;
}

function generarUrlListaPokemon(pagina) {
  return `${baseAPI}?offset=${pagina}0&limit=10`;
}

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
