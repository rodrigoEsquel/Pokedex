function actualizarLineaDisplay(nroLinea, data = '') {
  return `<tspan x="0" y="${13 * nroLinea}">${data}</tspan>`;
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

export function manejarPokemon(datosPokemon) {
  mostrarDisplay([
    ['Nombre', datosPokemon.nombre],
    ['Altura', `${datosPokemon.altura / 10} m`],
    ['Peso', `${datosPokemon.peso / 10} kg`],
    ['Tipo', (datosPokemon.tipo[0].type.name + (datosPokemon.tipo.length > 1 ? `-${datosPokemon.tipo[1].type.name}` : ''))],
  ]);
  actualizarImagen(datosPokemon.imagen);
  actualizarVisor(datosPokemon.id);
  actualizarPad(datosPokemon.id, datosPokemon.imagen);
}

export function manejarListaPokemon(datosLista) {
  mostrarDisplay([
    [`${datosLista.pagina * 10 + 1}-${datosLista.resultado[0]}`, `${datosLista.pagina * 10 + 6}-${datosLista.resultado[5]}`],
    [`${datosLista.pagina * 10 + 2}-${datosLista.resultado[1]}`, `${datosLista.pagina * 10 + 7}-${datosLista.resultado[6]}`],
    [`${datosLista.pagina * 10 + 3}-${datosLista.resultado[2]}`, `${datosLista.pagina * 10 + 8}-${datosLista.resultado[7]}`],
    [`${datosLista.pagina * 10 + 4}-${datosLista.resultado[3]}`, `${datosLista.pagina * 10 + 9}-${datosLista.resultado[8]}`],
    [`${datosLista.pagina * 10 + 5}-${datosLista.resultado[4]}`, `${datosLista.pagina * 10 + 10}-${datosLista.resultado[9]}`],
  ]);
  actualizarBotones(datosLista.resultado);
}
