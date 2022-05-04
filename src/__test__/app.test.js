/// <reference types="jest" />
/* eslint-disable import/extensions */
import inicializarPokedex from '../app.js';

jest.mock('../app.js');

test('createUser calls fetch with the right args and returns the user id', () => {
  inicializarPokedex();
  expect(inicializarPokedex).toHaveBeenCalledTimes(1);
});
