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
let callbackInput1;
let callbackInput2;

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
       document.body.innerHTML = '<div><button id="buscar"></button><input type="text" /><select id="select"><option value="nombre" selected>Nombre</option><option value="id">ID</option></select></div>';
       callbackInput1 = jest.fn();
       callbackInput2 = jest.fn();
       //Act
       configurarBusquedaInput(callbackInput1,callbackInput2);
 
    });
    
    test('Cuando el valor del campo input es texto y valido, se debe ejecutar el callback1', () => {
      // Arrange
      $('input').value = 'poke';

      // Act
      $('#buscar').trigger( "click" );

      // Assert
      expect(callbackInput1).toBeCalled();
      expect(callbackInput2).not.toBeCalled();
    });

    test('Cuando el valor del campo input no es un numero de pokemon ni una cadena de letras, no debe ejecutar el callback', () => {
      // Arrange
      document.querySelector('input').value = 'p9i';

      // Act
      $('#buscar').trigger( "click" );

      // Assert
      expect(callbackInput1).not.toBeCalled();
      expect(callbackInput2).not.toBeCalled();
    });
    /*
    test('Cuando se apreta Enter con un campo input valido, se debe realizar el callback1', () => {
      // Arrange      
      let event = $.Event( "keydown");
      event.key = 'Enter';
      document.querySelector('input').value = 'poke';

      // Act
      $(document.querySelector('input')).trigger(event);  // No logro ejecutar con JQuery el evento agregado con addEventListener

      // Assert
      expect(callbackInput1).toBeCalled();
      expect(callbackInput2).not.toBeCalled();
    });*/
  });
});