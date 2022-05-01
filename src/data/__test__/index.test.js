/// <reference types="jest" />
// eslint-disable-next-line import/extensions
import fixturePokemon from './mockList.json';
import 'regenerator-runtime/runtime' ; '@babel/runtime'

import { mapearDatosPokemon, mapearListaPokemones } from '../index.js';

beforeEach(() => {
  global.fetch = jest.fn();
});

test('Carga pokemon', async () => {
  global.fetch.mockReturnValueOnce(new Promise((resolve) => {
    const jsonPromise = new Promise((resolve) => resolve(fixturePokemon))
    resolve(jsonPromise);
  }))
  await mapearDatosPokemon(2);
  expect(global.fetch).toBeCalledTimes(1);
  expect(global.fetch).toBeCalledWith('https://pokeapi.co/api/v2/pokemon/2');
});

test('Carga lista Pokemon', async () => {
    global.fetch.mockReturnValueOnce(new Promise((resolve) => {
    resolve({json: () => "./mockList .json"});
  }))
  await mapearListaPokemones(2);
  expect(global.fetch).toBeCalledTimes(1);
  expect(global.fetch).toBeCalledWith('https://pokeapi.co/api/v2/pokemon/?offset=20&limit=10');
});