// Inicializacion
const baseAPI = 'https://pokeapi.co/api/v2/pokemon/';
const $inputText = document.querySelector('input');
const $imagen = document.querySelector('image');
const $numero = document.querySelector('#numero');
const $display1 = document.querySelector('#display-1');
const $display2 = document.querySelector('#display-2');
const regexNombrePokemon = /^[a-zA-Z]*$/;
const regexNumeroPokemon = /^[0-9]*$/;
let imagenes;
let listaPokemones;
let linkPokemones;
const estado = {
  lista: null,
  imagen: null,
  pokemon: null,
};

//Funciones

function inicializarPokedex() {
  $display1.innerHTML = '';
  $display2.innerHTML = '';
  imagenes = [];
  listaPokemones = [];
  linkPokemones = [];
  estado.pantalla = null;
  estado.imagen = null;
  estado.pokemon = null;
  $imagen.setAttribute('href', './img/pokebola.png');
  $numero.innerHTML = '';
}

function guardarImagenes(dataPkmn) {
  imagenes = [];
  imagenes[0] = dataPkmn.sprites.front_default;
  imagenes[1] = dataPkmn.sprites.back_default;
  imagenes[2] = dataPkmn.sprites.other['official-artwork'].front_default;
}

function actualizarImagen(numero) {
  $imagen.setAttribute('href', imagenes[numero]);
  estado.imagen = Number(numero);
}

function actualizarPokemon(numero, nombre) {
  $numero.innerHTML = 'ID ' + numero;
  estado.pokemon = Number(numero);
  $display1.innerHTML = 'Nombre:';
  $display2.innerHTML = nombre;
}

function actualizarListaPokemones() {
  $display1.innerHTML = `<tspan x="0" y="12">A: ${listaPokemones[0]}</tspan>
                        <tspan x="0" y="25">B: ${listaPokemones[1]}</tspan>
                        <tspan x="0" y="38">C: ${listaPokemones[2]}</tspan>
                        <tspan x="0" y="51">D: ${listaPokemones[3]}</tspan>
                        <tspan x="0" y="64">E: ${listaPokemones[4]}</tspan>`;
  $display2.innerHTML = `<tspan x="0" y="12">F: ${listaPokemones[5]}</tspan>
                        <tspan x="0" y="25">G: ${listaPokemones[6]}</tspan>
                        <tspan x="0" y="38">H: ${listaPokemones[7]}</tspan>
                        <tspan x="0" y="51">I: ${listaPokemones[8]}</tspan>
                        <tspan x="0" y="64">J: ${listaPokemones[9]}</tspan>`;
}

function cargarPokemon(pokemon) {
  const url = baseAPI + pokemon;
  fetch(url)
    .then((response) => response.json())
    .then((dataPkmn) => {
      guardarImagenes(dataPkmn);
      actualizarImagen(0);
      actualizarPokemon(dataPkmn.id, dataPkmn.name);
    })
    .catch(function (error) {
      console.log('Hubo un problema con la petición Fetch:' + error.message);
      $inputText.value = 'Pokemon no encontrado';
    });
}

function cargarListaPokemon(nroLista) {
  const url = `${baseAPI}?offset=${nroLista}&limit=10`;
  console.log(url);
  fetch(url)
    .then((response) => response.json())
    .then((dataPkmn) => {
      dataPkmn.results.forEach((elem, i) => {
        listaPokemones[i] = elem.name;
        linkPokemones[i] = elem.url;
      });
      actualizarListaPokemones();
    })
    .catch(function (error) {
      console.log('Hubo un problema con la petición Fetch:' + error.message);
    });
}

//Handlers
document.querySelector('#reinicio').onclick = inicializarPokedex;

document.querySelector('#buscar').onclick = function () {
  inicializarPokedex();
  if (regexNombrePokemon.test($inputText.value) || regexNumeroPokemon.test($inputText.value)) {
    cargarPokemon($inputText.value);
  }
};

document.querySelector('#explorar').onclick = function () {
  inicializarPokedex();
  estado.lista = 0;
  cargarListaPokemon(estado.lista);
};

document.querySelector('#padArriba').onclick = function () {
  if (typeof estado.imagen === 'number') {
    let siguienteImagen = (estado.imagen + 1) % 3;
    actualizarImagen(siguienteImagen);
  }
};

document.querySelector('#padAbajo').onclick = function () {
  if (typeof estado.imagen === 'number') {
    let siguienteImagen = (estado.imagen + 2) % 3;
    actualizarImagen(siguienteImagen);
  }
};

document.querySelector('#padDerecha').onclick = function () {
  if (typeof estado.pokemon === 'number') {
    cargarPokemon(estado.pokemon + 1);
  }
};

document.querySelector('#padIzquierda').onclick = function () {
  if (typeof estado.pokemon === 'number' && estado.pokemon > 1) {
    cargarPokemon(estado.pokemon - 1);
  }
};

inicializarPokedex();
