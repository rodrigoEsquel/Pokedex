const baseAPI = 'https://pokeapi.co/api/v2/pokemon/';

export function generarUrlPokemon(pokemon) {
  return baseAPI + pokemon;
}

export function generarUrlListaPokemon(pagina) {
  return `${baseAPI}?offset=${pagina}0&limit=10`;
}
