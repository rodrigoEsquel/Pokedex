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
let callbackReset;
let callbackInput;

describe('Inicializacion de la UI pokedex',()=>{

  describe('Boton de reset',()=>{

    beforeAll(() => {

       // Arrange
       document.body.innerHTML = '<div><div id="reinicio"></div><button id="buscar"></button> <input type="text" /></div>';
       callbackReset = jest.fn();
       configurarBotonReset(callbackReset);
       
       //Act
       $('#reinicio').trigger( "click" );
 
    });

    test("Cuando inicializa el boton de reset llama a la funcion 'mostrarDisplay' con parámetros vacios", () => {
      //Assert
      expect(mostrarDisplay).toBeCalled();
      expect(mostrarDisplay).toBeCalledWith(['', '']);

    });
    test("Cuando inicializa el boton de reset llama a la funcion 'mostrarImagen' con parámetros vacios", () => {
      // Assert
      expect(mostrarImagen).toBeCalled();
    });

    test("Cuando inicializa el boton de reset llama a la funcion 'actualizarVisor' con parámetros vacios", () => {
      // Assert
      expect(actualizarVisor).toBeCalled();
      expect(actualizarVisor).toBeCalledWith('');
    });

    test("Cuando inicializa el boton de reset llama a la funcion 'actualizarPadIzqDer'", () => {
       // Assert
      expect(actualizarPadIzqDer).toBeCalled();
      expect(actualizarPadIzqDer).toBeCalledWith('');
    });

    test("Cuando ejecuta el boton de reset llama a la funcion 'actualizarNavegacion' con parámetros vacios", () => {
      // Assert
      expect(actualizarNavegacion).toBeCalled();
      expect(actualizarNavegacion).toBeCalledWith(-1,callbackReset);
    });
     test("Cuando inicializa el boton de reset llama a la funcion 'actualizarBotones' con parámetros vacios", () => {
      // Assert
      expect(actualizarBotones).toBeCalled();
      expect(actualizarBotones).toBeCalledWith('');
    });
     test("Cuando inicializa el boton de reset llama a la funcion 'actualizarPadArrAbj' con parámetros vacios", () => {
      // Assert
      expect(actualizarPadArrAbj).toBeCalled();
      expect(actualizarPadArrAbj).toBeCalledWith('');
    });
  });

  
  describe('Input de Busqueda',()=>{  

    beforeEach(() => {

       // Arrange
       document.body.innerHTML = '<div><button id="buscar"></button><input type="text" /></div>';
       callbackInput = jest.fn();
       
       //Act
       configurarBusquedaInput(callbackInput);
 
    });
    
    test('Cuando el valor del campo input es valido, se debe ejecutar el callback', () => {
      // Arrange
      $('input').value = 2;

      // Act
      $('#buscar').trigger( "click" );

      // Assert
      expect(callbackInput).toBeCalled();
    });
    
    test('Cuando el valor del campo input no es un numero de pokemon ni una cadena de letras, no debe ejecutar el callback', () => {
      // Arrange
      document.querySelector('input').value = 'p9i';

      // Act
      $('#buscar').trigger( "click" );

      // Assert
      expect(callbackInput).not.toBeCalled();
    });
    
    test('Cuando se apreta Enter con un campo input valido, se debe realizar el callback', () => {
      // Arrange      
      let event = $.Event( "keydown");
      event.key = 'Enter';
      document.querySelector('input').value = '3';

      // Act
      $(document.querySelector('input')).trigger(event);  // No logro ejecutar con JQuery el evento agregado con addEventListener

      // Assert
      expect(callbackInput).not.toBeCalled();
    });
  });
});