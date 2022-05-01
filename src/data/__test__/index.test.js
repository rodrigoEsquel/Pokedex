/// <reference types="jest" />
// eslint-disable-next-line import/extensions
import { mapearDatosPokemon, mapearListaPokemones } from '../index.js';

beforeEach(() => {
  global.fetch = jest.fn();
});

test('Carga pokemon', async () => {
  await mapearDatosPokemon(2);
  expect(global.fetch).toBeCalledTimes(1);
  expect(global.fetch).toBeCalledWith('https://pokeapi.co/api/v2/pokemon/2');
})

test('Carga lista Pokemon', async () => {
  await mapearListaPokemones(2);
  expect(global.fetch).toBeCalledTimes(1);
  expect(global.fetch).toBeCalledWith('https://pokeapi.co/api/v2/pokemon/?offset=20&limit=10');
})