/**
 * @jest-environment jsdom
 */
/// <reference types="jest" />
// eslint-disable-next-line import/extensions
import {configurarBusquedaInput, configurarBotonReset} from "../init";
import {
  mostrarDisplay,
  mostrarImagen,
  actualizarVisor,
  actualizarPadIzqDer,
  actualizarNavegacion,
  actualizarBotones,
  actualizarPadArrAbj,
} from '../handlers.js';

const $ = require('jquery');
jest.mock('../handlers.js');

beforeEach(() => {
  document.body.innerHTML = '<div><div id="reinicio"></div><button id="buscar"></button> <input type="text" /></div>'  ;
 
})

test('inicializacion de el boton de reset', () => {
  const callback = jest.fn();
  configurarBotonReset(callback);
  $('#reinicio').click();
  expect(mostrarDisplay).toBeCalledTimes(1);
  expect(mostrarImagen).toBeCalledTimes(1);
  expect(actualizarVisor).toBeCalledTimes(1);
  expect(actualizarPadIzqDer).toBeCalledTimes(1);
  expect(actualizarNavegacion).toBeCalledTimes(1);
  expect(actualizarNavegacion).toBeCalledWith(-1,callback);
  expect(actualizarBotones).toBeCalledTimes(1);
  expect(actualizarPadArrAbj).toBeCalledTimes(1);
})

test('inicializacion de la busqueda por input ok con boton buscar', () => {
const callback = jest.fn();
configurarBusquedaInput(callback);
$('input').value = 2;
$('#buscar').click();
expect(callback).toBeCalledTimes(1);
});

test('inicializacion de la busqueda por input erronea con boton buscar', () => {
const callback = jest.fn();
configurarBusquedaInput(callback);
$('input').value = 'p0kem0n';
$('#buscar').click();
expect(callback).toBeCalledTimes(0);
});

test('inicializacion de la busqueda por input con enter', () => {
const event = $.Event( "keypress");
event.which = 13;
event.key= 'Enter';
const callback = jest.fn();
configurarBusquedaInput(callback);
$('input').value = '3';
$('input').trigger(event);
expect(callback).toBeCalledTimes(1);
});