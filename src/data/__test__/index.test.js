/// <reference types="jest" />
// eslint-disable-next-line import/extensions
import pokemonFixture from './pokeMock.json';
import pokemonListFixture from './listMock.json';
import 'regenerator-runtime/runtime' ; '@babel/runtime'

import { mapearDatosPokemon, mapearListaPokemones } from '../index.js';

beforeEach(() => {
  global.fetch = jest.fn();
});

test('Carga pokemon', async () => {
  global.fetch.mockReturnValueOnce(new Promise((resolve) => {
    const jsonPromise = new Promise((resolve) => resolve({json: () => pokemonFixture}))
    resolve(jsonPromise);
  }))
  const respuesta = await mapearDatosPokemon(1);
  expect(typeof respuesta).toBe("object");
  expect(Object.keys(respuesta)).toContain("imagenes");
  expect(Object.keys(respuesta)).toContain("id");
  expect(Object.keys(respuesta)).toContain("nombre");
  expect(Object.keys(respuesta)).toContain("altura");
  expect(Object.keys(respuesta)).toContain("peso");
  expect(Object.keys(respuesta)).toContain("tipo");  
});

test('Carga lista Pokemon', async () => {
    global.fetch.mockReturnValueOnce(new Promise((resolve) => {
    resolve({json: () => pokemonListFixture});
  }))
  const respuesta = await mapearListaPokemones(2);
  expect(typeof respuesta).toBe("object");
  expect(Object.keys(respuesta)).toContain("resultado");
  expect(respuesta.resultado.length).toBe(10);
});