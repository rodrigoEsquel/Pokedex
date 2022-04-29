// Funciones
function configurarBusquedaInput(callbackPokemon) {
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

function actualizarLineaDisplay(nroLinea, texto = '') {
  return `<tspan x="0" y="${13 * nroLinea}">${texto}</tspan>`;
}

function mostrarDisplay(data) {
  const $display1 = document.querySelector('#display-1');
  const $display2 = document.querySelector('#display-2');
  let display1 = '';
  let display2 = '';
  data.forEach((elem, i) => {
    display1 += actualizarLineaDisplay((i + 1), elem[0]);
  });
  data.forEach((elem, i) => {
    display2 += actualizarLineaDisplay((i + 1), elem[1]);
  });
  $display1.innerHTML = display1;
  $display2.innerHTML = display2;
}

function mostrarImagen(imagen) {
  const $imagen = document.querySelector('image');
  $imagen.setAttribute('href', imagen);
}

function actualizarPadArrAbj(imagenesPokemon, callbackActualizarImagen) {
  document.querySelector('#padArriba').onclick = function buscarImagenSiguiente() {
    callbackActualizarImagen(imagenesPokemon, 1);
  };
  document.querySelector('#padAbajo').onclick = function buscarImagenSiguiente() {
    callbackActualizarImagen(imagenesPokemon, (imagenesPokemon.length - 1));
  };
}

function actualizarImagen(imagenesPokemon, indice = 0) {
  for (let i = 0; i < indice; i += 1) {
    imagenesPokemon.push(imagenesPokemon.shift());
  }
  actualizarPadArrAbj(imagenesPokemon, actualizarImagen);
  mostrarImagen(imagenesPokemon[0]);
}

function actualizarVisor(input) {
  let mensaje = input;
  const $displayId = document.querySelector('#numero');
  if (mensaje) {
    mensaje = `ID ${mensaje}`;
  }
  $displayId.innerHTML = mensaje;
}

function actualizarPadIzqDer(idPokemon, callbackPokemon) {
  document.querySelector('#padDerecha').onclick = function buscarPokemonSiguiente() {
    callbackPokemon(idPokemon + 1);
  };
  document.querySelector('#padIzquierda').onclick = function buscarPokemonPrevio() {
    if (idPokemon > 1) {
      callbackPokemon(idPokemon - 1);
    }
  };
}

function actualizarBotones(listaPokemones, callbackPokemon) {
  document.querySelectorAll('.boton-pokemon').forEach((elem, i) => {
    // eslint-disable-next-line no-param-reassign
    elem.onclick = () => {
      callbackPokemon(listaPokemones[i]);
    };
  });
}

function actualizarNavegacion(pagina, callbackListaPokemones) {
  const siguientePagina = pagina + 1;
  const anteriorPagina = pagina - 1;
  document.querySelector('#explorar-mas').onclick = function buscarPaginaSiguiente() {
    callbackListaPokemones(siguientePagina);
  };
  document.querySelector('#explorar-menos').onclick = function buscarPaginaAnterior() {
    if (pagina !== 0) {
      callbackListaPokemones(anteriorPagina);
    }
  };
}

function configurarBotonReset(callbackListaPokemones) {
  document.querySelector('#reinicio').onclick = function reiniciarPokedex() {
    mostrarDisplay(['', '']);
    mostrarImagen('./img/pokebola.png');
    actualizarVisor('');
    actualizarPadIzqDer('', () => {});
    actualizarNavegacion(1, callbackListaPokemones);
    actualizarBotones('', () => {});
    actualizarPadArrAbj('', () => {});
  };
}

export function inicializarUiPokedex(callbackPokemon, callbackListaPokemones) {
  actualizarNavegacion(1, callbackListaPokemones);
  configurarBusquedaInput(callbackPokemon);
  configurarBotonReset(callbackListaPokemones);
}

export function actualizarUiPokemon(datosPokemon, callbackPokemon) {
  mostrarDisplay([
    ['Nombre', datosPokemon.nombre],
    ['Altura', `${datosPokemon.altura / 10} m`],
    ['Peso', `${datosPokemon.peso / 10} kg`],
    ['Tipo', (datosPokemon.tipo[0].type.name + (datosPokemon.tipo.length > 1 ? `-${datosPokemon.tipo[1].type.name}` : ''))],
  ]);
  const { imagenes } = datosPokemon;
  actualizarImagen(imagenes);
  actualizarVisor(datosPokemon.id);
  actualizarPadIzqDer(datosPokemon.id, callbackPokemon);
}

export function actualizarUiListaPokemon(datosLista, callbackPokemon, callbackListaPokemones) {
  mostrarDisplay([
    [`${datosLista.pagina * 10 + 1}-${datosLista.resultado[0]}`, `${datosLista.pagina * 10 + 6}-${datosLista.resultado[5]}`],
    [`${datosLista.pagina * 10 + 2}-${datosLista.resultado[1]}`, `${datosLista.pagina * 10 + 7}-${datosLista.resultado[6]}`],
    [`${datosLista.pagina * 10 + 3}-${datosLista.resultado[2]}`, `${datosLista.pagina * 10 + 8}-${datosLista.resultado[7]}`],
    [`${datosLista.pagina * 10 + 4}-${datosLista.resultado[3]}`, `${datosLista.pagina * 10 + 9}-${datosLista.resultado[8]}`],
    [`${datosLista.pagina * 10 + 5}-${datosLista.resultado[4]}`, `${datosLista.pagina * 10 + 10}-${datosLista.resultado[9]}`],
  ]);
  actualizarBotones(datosLista.resultado, callbackPokemon);
  actualizarNavegacion(datosLista.pagina, callbackListaPokemones);
}

export function mostrarCargandoPokemon() {
  mostrarImagen('./img/pokebola.png');
}

export function mostrarCargandoDisplay() {
  mostrarDisplay([['Cargando...', '']]);
}
