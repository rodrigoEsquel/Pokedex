/// <reference types="jest" />
// eslint-disable-next-line import/extensions
import 'regenerator-runtime/runtime' ; '@babel/runtime'
import { cargarPokemon, cargarListaPokemon } from '../api';

beforeEach(() => {
  global.fetch = jest.fn();
});

test('Carga pokemon', async () => {
  global.fetch.mockReturnValueOnce(new Promise((resolve) => {  
    resolve({json: () => "respuesta json"});
  }));
  await cargarPokemon(1);
  expect(global.fetch).toBeCalledTimes(1);
  expect(global.fetch).toBeCalledWith('https://pokeapi.co/api/v2/pokemon/1');
});

test('Carga lista Pokemon', async () => {
    global.fetch.mockReturnValueOnce(new Promise((resolve) => {
    resolve({json: () => "respuesta json"});
  }))
  await cargarListaPokemon(2);
  expect(global.fetch).toBeCalledTimes(1);
  expect(global.fetch).toBeCalledWith('https://pokeapi.co/api/v2/pokemon/?offset=20&limit=10');
});