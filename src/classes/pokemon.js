class Pokemon {  
  constructor(pokemon) {
    const imagen0 = pokemon.sprites.front_default;
    const imagen1 = pokemon.sprites.back_default;
    const imagen2 = pokemon.sprites.other['official-artwork'].front_default;
    this.nombre = pokemon.name;
    this.imagenes = [imagen0, imagen1, imagen2];
    this.id = pokemon.id;
    this.altura = pokemon.height;
    this.peso = pokemon.weight;
    this.tipo = pokemon.types;
  }
}

export default Pokemon;