class ListaPokemon {
  constructor(pagina,lista) {
    this.resultado = lista.map((e) => e.name);
    this.pagina = pagina;
  }
}

export default ListaPokemon;