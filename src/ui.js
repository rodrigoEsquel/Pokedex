function actualizarLineaDisplay(nroLinea, texto = '') {
  return `<tspan x="0" y="${13 * nroLinea}">${texto}</tspan>`;
}

function mostrarDisplay(data) {
  const $display1 = document.querySelector('#display-1');
  const $display2 = document.querySelector('#display-2');

  $display1.innerHTML = actualizarLineaDisplay(1, data[0][0])
                      + actualizarLineaDisplay(2, data[1][0])
                      + actualizarLineaDisplay(3, data[2][0])
                      + actualizarLineaDisplay(4, data[3][0])
                      + actualizarLineaDisplay(5, data[4][0]);

  $display2.innerHTML = actualizarLineaDisplay(1, data[0][1])
                      + actualizarLineaDisplay(2, data[1][1])
                      + actualizarLineaDisplay(3, data[2][1])
                      + actualizarLineaDisplay(4, data[3][1])
                      + actualizarLineaDisplay(5, data[4][1]);
}

function actualizarImagen(imagenesPokemon, indice = 0) {
  for (let i = 0; i < indice; i += 1) {
    imagenesPokemon.push(imagenesPokemon.shift());
  }
  const $imagen = document.querySelector('image');
  $imagen.setAttribute('href', imagenesPokemon[0]);
}
function actualizarVisor(idPokemon) {
  const $displayId = document.querySelector('#numero');
  $displayId.innerHTML = `ID ${idPokemon}`;
}

function actualizarPad(idPokemon, imagenesPokemon, callbackPokemon) {
  document.querySelector('#padArriba').onclick = actualizarImagen(imagenesPokemon, 1);
  document.querySelector('#padAbajo').onclick = actualizarImagen(imagenesPokemon, (imagenesPokemon.length - 1));

  document.querySelector('#padDerecha').onclick = function buscarPokemonSiguiente() {
    callbackPokemon(idPokemon + 1);
  };

  document.querySelector('#padIzquierda').onclick = function buscarPokemonPrevio() {
    if (idPokemon > 1) {
      callbackPokemon(idPokemon - 1);
    }
  };
}

function actualizarBotones(callbackListaPokemones, listaPokemones) {
  document.querySelectorAll('.boton-pokemon').forEach((elem, i) => {
    elem.onclick = () => {
      callbackListaPokemones(listaPokemones[i]);
    };
  });
}

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
export function obtenerPokemonSeleccionado() {
}
export function actualizarNavegacion(callbackListaPokemones, pagina = 0) {
  document.querySelector('#explorar-mas').onclick = function buscarPaginaSiguiente() {
    callbackListaPokemones((pagina + 1));
  };
  document.querySelector('#explorar-menos').onclick = function buscarPaginaAnterior() {
    if (pagina > 0) {
      callbackListaPokemones((pagina + 1));
    }
  };
}

export function manejarPokemon(datosPokemon) {
  mostrarDisplay([
    ['Nombre', datosPokemon.nombre],
    ['Altura', `${datosPokemon.altura / 10} m`],
    ['Peso', `${datosPokemon.peso / 10} kg`],
    ['Tipo', (datosPokemon.tipo[0].type.name + (datosPokemon.tipo.length > 1 ? `-${datosPokemon.tipo[1].type.name}` : ''))],
  ]);
  actualizarImagen(datosPokemon.imagenes);
  actualizarVisor(datosPokemon.id);
  actualizarPad(datosPokemon.id, datosPokemon.imagenes);
}

export function manejarListaPokemon(datosLista, callbackListaPokemones) {
  mostrarDisplay([
    [`${datosLista.pagina * 10 + 1}-${datosLista.resultado[0]}`, `${datosLista.pagina * 10 + 6}-${datosLista.resultado[5]}`],
    [`${datosLista.pagina * 10 + 2}-${datosLista.resultado[1]}`, `${datosLista.pagina * 10 + 7}-${datosLista.resultado[6]}`],
    [`${datosLista.pagina * 10 + 3}-${datosLista.resultado[2]}`, `${datosLista.pagina * 10 + 8}-${datosLista.resultado[7]}`],
    [`${datosLista.pagina * 10 + 4}-${datosLista.resultado[3]}`, `${datosLista.pagina * 10 + 9}-${datosLista.resultado[8]}`],
    [`${datosLista.pagina * 10 + 5}-${datosLista.resultado[4]}`, `${datosLista.pagina * 10 + 10}-${datosLista.resultado[9]}`],
  ]);
  actualizarBotones(callbackListaPokemones, datosLista.resultado);
  actualizarNavegacion(callbackListaPokemones, datosLista.pagina);
}

export function inicializarInput(callbackPokemon) {
  document.querySelector('#reinicio').onclick = inicializarPokedex;
  const $inputText = document.querySelector('input');
  function buscarPokemon() {
    const regexNombrePokemon = /^[a-zA-Z]*$/;
    const regexNumeroPokemon = /^[0-9]*$/;
    const pokemon = $inputText.value.replace(/\s+/g, '').toLowerCase();
    if (regexNombrePokemon.test(pokemon) || regexNumeroPokemon.test(pokemon)) {
      callbackPokemon(pokemon);
    }
  }
  document.querySelector('#buscar').onclick = buscarPokemon;
  function enviarInput(event) {
    if (event.key === 'Enter') {
      buscarPokemon();
    }
  }
  $inputText.addEventListener('keypress', enviarInput, false);
}
