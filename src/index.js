// Inicializacion
const baseAPI = 'https://pokeapi.co/api/v2/pokemon/';
const $inputText = document.querySelector('input');
const regexNombrePokemon = /^[a-zA-Z]*$/;
const regexNumeroPokemon = /^[0-9]*$/;
let imagenes = [];

const estado = {
  pantalla: 'off',
  imagen: null,
  pokemon: null,
};

//Funciones
const guardarImagenes = function (dataPkmn) {
  imagenes = [];
  imagenes[0] = dataPkmn.sprites.front_default;
  imagenes[1] = dataPkmn.sprites.back_default;
  imagenes[2] = dataPkmn.sprites.other['official-artwork'].front_default;
};

const actualizarImagen = function (numero) {
  document.querySelector('image').setAttribute('href', imagenes[numero]);
  estado.imagen = Number(numero);
};

const actualizarPokemon = function (numero) {
  document.querySelector('#numero').innerHTML = 'ID ' + numero;
  estado.pokemon = Number(numero);
};

const cargarPokemon = function (pokemon) {
  const url = baseAPI + pokemon;
  fetch(url)
    .then((response) => response.json())
    .then((dataPkmn) => {
      guardarImagenes(dataPkmn);
      actualizarImagen(0);
      actualizarPokemon(dataPkmn.id);
    })
    .catch(function (error) {
      console.log('Hubo un problema con la petición Fetch:' + error.message);
      $inputText.value = 'Pokemon no encontrado';
    });
};

//Handlers
document.querySelector('#buscar').onclick = function () {
  if (regexNombrePokemon.test($inputText.value) || regexNumeroPokemon.test($inputText.value)) {
    cargarPokemon($inputText.value);
  }
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
