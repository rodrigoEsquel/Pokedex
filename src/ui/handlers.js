function actualizarLineaDisplay(nroLinea, texto = '') {
  return `<tspan x="0" y="${13 * nroLinea}">${texto}</tspan>`;
}

export function mostrarDisplay(data) {
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

export function mostrarImagen(imagen) {
  const $imagen = document.querySelector('image');
  $imagen.setAttribute('href', imagen);
}

export function actualizarPadArrAbj(imagenesPokemon, callbackActualizarImagen = () => {}) {
  document.querySelector('#padArriba').onclick = function buscarImagenSiguiente() {
    callbackActualizarImagen(imagenesPokemon, 1);
  };
  document.querySelector('#padAbajo').onclick = function buscarImagenSiguiente() {
    callbackActualizarImagen(imagenesPokemon, (imagenesPokemon.length - 1));
  };
}

export function actualizarImagen(imagenesPokemon, indice = 0) {
  for (let i = 0; i < indice; i += 1) {
    imagenesPokemon.push(imagenesPokemon.shift());
  }
  actualizarPadArrAbj(imagenesPokemon, actualizarImagen);
  mostrarImagen(imagenesPokemon[0]);
}

export function actualizarVisor(input) {
  let mensaje = input;
  const $displayId = document.querySelector('#numero');
  if (mensaje) {
    mensaje = `ID ${mensaje}`;
  }
  $displayId.innerHTML = mensaje;
}

export function actualizarPadIzqDer(idPokemon, callbackPokemon = () => {}) {
  document.querySelector('#padDerecha').onclick = function buscarPokemonSiguiente() {
    callbackPokemon(idPokemon + 1);
  };
  document.querySelector('#padIzquierda').onclick = function buscarPokemonPrevio() {
    if (idPokemon > 1) {
      callbackPokemon(idPokemon - 1);
    }
  };
}

export function actualizarBotones(listaPokemones, callbackPokemon = () => {}) {
  document.querySelectorAll('.boton-pokemon').forEach((elem, i) => {
    // eslint-disable-next-line no-param-reassign
    elem.onclick = () => {
      callbackPokemon(listaPokemones[i]);
    };
  });
}

export function actualizarNavegacion(pagina, callbackListaPokemones = () => {}) {
  const siguientePagina = pagina + 1;
  const anteriorPagina = pagina - 1;
  document.querySelector('#explorar-mas').onclick = function buscarPaginaSiguiente() {
    callbackListaPokemones(siguientePagina);
  };
  document.querySelector('#explorar-menos').onclick = function buscarPaginaAnterior() {
    if (pagina > 0) {
      callbackListaPokemones(anteriorPagina);
    } else {
      callbackListaPokemones(0);
    }
  };
}
