export class Pokemon {  
  constructor(Pokemon) {
    const imagen0 = Pokemon.sprites.front_default;
    const imagen1 = Pokemon.sprites.back_default;
    const imagen2 = Pokemon.sprites.other['official-artwork'].front_default;
    this.nombre = Pokemon.name;
    this.imagenes = [imagen0, imagen1, imagen2];
    this.id = Pokemon.id;
    this.altura = Pokemon.height;
    this.peso = Pokemon.weight;
    this.tipo = Pokemon.types;
  }
}