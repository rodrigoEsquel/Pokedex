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
const estado = {
  lista: null,
  imagen: null,
  pokemon: null,
};

// Funciones
function inicializarPokedex() {
  $display1.innerHTML = '';
  $display2.innerHTML = '';
  imagenes = [];
  listaPokemones = [null, null, null, null, null, null, null, null, null, null];
  estado.lista = null;
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

function generarUrlPokemon(pokemon) {
  return baseAPI + pokemon;
}

function actualizarImagen(numero) {
  $imagen.setAttribute('href', imagenes[numero]);
  estado.imagen = Number(numero);
}

function actualizarPokemon(numero, nombre, altura, peso, tipo) {
  $numero.innerHTML = `ID ${numero}`;
  estado.pokemon = Number(numero);
  $display1.innerHTML = `<tspan x="0" y="12">Nombre:</tspan>
                         <tspan x="0" y="25">Altura</tspan>
                         <tspan x="0" y="38">Peso</tspan>
                         <tspan x="0" y="51">Tipo</tspan>`;
  $display2.innerHTML = `<tspan x="0" y="12">${nombre}</tspan>
  <tspan x="0" y="25">${altura / 10} m</tspan>
  <tspan x="0" y="38">${peso / 10} kg</tspan>
  <tspan x="0" y="51">${tipo[0].type.name}${tipo.length > 1 ? `-${tipo[1].type.name}` : ''}</tspan>`;
}

function generarUrlListaPokemon(pokemon) {
  return `${baseAPI}?offset=${pokemon}0&limit=10`;
}

function actualizarListaPokemones(lista) {
  lista.forEach((elem, i) => {
    listaPokemones[i] = elem.name;
  });
}

function mostrarListaPokemones() {
  $display1.innerHTML = `<tspan x="0" y="12">${estado.lista * 10 + 1}-${listaPokemones[0]}</tspan>
                        <tspan x="0" y="25">${estado.lista * 10 + 2}-${listaPokemones[1]}</tspan>
                        <tspan x="0" y="38">${estado.lista * 10 + 3}-${listaPokemones[2]}</tspan>
                        <tspan x="0" y="51">${estado.lista * 10 + 4}-${listaPokemones[3]}</tspan>
                        <tspan x="0" y="64">${estado.lista * 10 + 5}-${listaPokemones[4]}</tspan>`;
  $display2.innerHTML = `<tspan x="0" y="12">${estado.lista * 10 + 6}-${listaPokemones[5]}</tspan>
                        <tspan x="0" y="25">${estado.lista * 10 + 7}-${listaPokemones[6]}</tspan>
                        <tspan x="0" y="38">${estado.lista * 10 + 8}-${listaPokemones[7]}</tspan>
                        <tspan x="0" y="51">${estado.lista * 10 + 9}-${listaPokemones[8]}</tspan>
                        <tspan x="0" y="64">${estado.lista * 10 + 10}-${listaPokemones[9]}</tspan>`;
}

function cargarPokemon(pokemon) {
  if (pokemon) {
    fetch(generarUrlPokemon(pokemon))
      .then((response) => response.json())
      .then((dataPkmn) => {
        guardarImagenes(dataPkmn);
        actualizarImagen(0);
        actualizarPokemon(dataPkmn.id, dataPkmn.name, dataPkmn.height, dataPkmn.weight, dataPkmn.types);
      })
      .catch((error) => {
        console.log(`Hubo un problema con la petición Fetch:${error.message}`);
        $inputText.value = 'Pokemon no encontrado';
      });
  }
}

function cargarListaPokemon(nroLista) {
  fetch(generarUrlListaPokemon(nroLista))
    .then((response) => response.json())
    .then((dataPkmn) => {
      actualizarListaPokemones(dataPkmn.results);
      mostrarListaPokemones();
    })
    .catch((error) => {
      console.log(`Hubo un problema con la petición Fetch:${error.message}`);
    });
}

// Handlers
document.querySelector('#reinicio').onclick = inicializarPokedex;

document.querySelector('#buscar').onclick = function () {
  inicializarPokedex();
  const pokemon = $inputText.value.replace(/\s+/g, '').toLowerCase();
  if (regexNombrePokemon.test(pokemon) || regexNumeroPokemon.test(pokemon)) {
    cargarPokemon(pokemon);
  }
};

$inputText.addEventListener('keypress', enviarInput, false);

function enviarInput(event) {
  if (event.key === 'Enter') {
    inicializarPokedex();
    const pokemon = $inputText.value.replace(/\s+/g, '').toLowerCase();
    if (regexNombrePokemon.test(pokemon) || regexNumeroPokemon.test(pokemon)) {
      cargarPokemon(pokemon);
    }
  }
}

document.querySelector('#explorar-mas').onclick = function () {
  // inicializarPokedex();
  if (estado.lista === null) {
    estado.lista = 0;
  } else if (estado.lista < 1126) {
    estado.lista += 1;
  }
  cargarListaPokemon(estado.lista);
};

document.querySelector('#explorar-menos').onclick = function () {
  // inicializarPokedex();
  if (estado.lista === null) {
    estado.lista = 0;
  } else if (estado.lista > 0) {
    estado.lista -= 1;
  }
  cargarListaPokemon(estado.lista);
};

document.querySelector('#padArriba').onclick = function () {
  if (typeof estado.imagen === 'number') {
    const siguienteImagen = (estado.imagen + 1) % 3;
    actualizarImagen(siguienteImagen);
  }
};

document.querySelector('#padAbajo').onclick = function () {
  if (typeof estado.imagen === 'number') {
    const siguienteImagen = (estado.imagen + 2) % 3;
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

document.querySelectorAll('.boton-pokemon').forEach((elem, i) => {
  if (elem.id === `boton-${i}`) {
    elem.onclick = () => {
      if (estado.lista !== null) {
        cargarPokemon(listaPokemones[i]);
      }
    };
  }
});

// Inicio
inicializarPokedex();
