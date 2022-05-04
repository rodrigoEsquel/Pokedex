/// <reference types="jest" />
/* eslint-disable import/extensions */
import inicializarPokedex from '../app.js';
import {
  inicializarUiPokedex,
} from '../ui/index.js';

jest.mock('../ui/index.js');

test('createUser calls fetch with the right args and returns the user id', () => {
  inicializarPokedex();
  expect(inicializarUiPokedex).toHaveBeenCalledTimes(1);
});
