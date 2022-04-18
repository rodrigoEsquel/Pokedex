/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('Pokedex', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('http://192.168.0.2:8080');
  });

  it('muestra Pokedex e Input', () => {
    cy.get('#pokedex').should('be.visible');
    cy.get('input').should('be.visible').and('have.attr', 'type');
  });

  it('puede buscar un pokemon por nombre', () => {
    const newPokemon = 'pikachu';
    cy.get('input').type(`${newPokemon}{enter}`);
    cy.get('#numero').should('have.text', 'ID 25');
  });

  it('puede buscar un pokemon por numero', () => {
    cy.get('input').type(`26{enter}`);
    cy.get('#display-2').should('contain.text', 'raichu');
  });

  it('reinicia valores', () => {
    cy.get('input').type(`26{enter}`);
    cy.get('#reinicio').click();
    cy.get('#numero').should('have.text', '');
    cy.get('#display-1').should('have.text', '');
    cy.get('#display-2').should('have.text', '');
  });

  it('despliega menu con boton mas', () => {
    cy.get('#explorar-mas').click();
    cy.get('#display-1').should('contain.text', 'charmander');
    cy.get('#display-2').should('contain.text', 'charizard');
  });

  it('despliega menu con boton menos', () => {
    cy.get('#explorar-menos').click();
    cy.get('#display-1').should('contain.text', 'charmander');
    cy.get('#display-2').should('contain.text', 'charizard');
  });

  context('interacciones', () => {
    it('navega por pokemones con el cursor derecho', () => {
      cy.get('input').type(`26{enter}`);
      cy.get('#padDerecha').click();
      cy.get('#numero').should('have.text', 'ID 27');
    });

    it('navega por pokemones con el cursor izquierdo', () => {
      cy.get('input').type(`26{enter}`);
      cy.get('#padIzquierda').click();
      cy.get('#numero').should('have.text', 'ID 25');
    });
    /*
    it('cambia imagen con cursor arriba', () => {
      cy.get('input').type(`26{enter}`);
      const anteriorImagen = cy.get('#imagen').screenshot();
      //cy.get('#padArriba').click();
      cy.get('#imagen').screenshot().should('equal', anteriorImagen);
    });
    */
    it('navega por pokemones desde el menu', () => {
      cy.get('#explorar-mas').click();
      cy.get('#boton-1').click();
      cy.get('#numero').should('have.text', 'ID 2');
    });

    it('menu habilita cursores', () => {
      cy.get('#explorar-mas').click();
      cy.get('#boton-1').click();
      cy.get('#numero').should('have.text', 'ID 2');
      cy.get('#padIzquierda').click();
      cy.get('#numero').should('have.text', 'ID 1');
    });

    it('cursores no reinicia menu', () => {
      cy.get('#explorar-mas').click();
      cy.get('#boton-1').click();
      cy.get('#numero').should('have.text', 'ID 2');
      cy.get('#padIzquierda').click();
      cy.get('#numero').should('have.text', 'ID 1');
      cy.get('#explorar-mas').click();
      cy.wait(500);
      // cy.get('#explorar-mas').click(); //no deberia!!
      cy.get('#boton-4').click();
      cy.get('#numero').should('have.text', 'ID 15');
    });

    it('buscar reinicia menu', () => {
      const newPokemon = 'pikachu';
      cy.get('#explorar-mas').click();
      cy.get('#boton-1').click();
      cy.get('#numero').should('have.text', 'ID 2');
      cy.get('input').type(`${newPokemon}{enter}`);
      cy.get('#boton-4').click();
      cy.get('#numero').should('have.text', 'ID 25');
    });
  });
});
