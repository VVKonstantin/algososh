import {
  dfltColor,
  chngColor,
  modColor,
  circlesIn
} from "../../src/constants/test"

describe('testing string recursion', function () {

  beforeEach(function () {
    cy.visit('http://localhost:3000/#/recursion');
  });

  it('if input is empty button should be disabled', function () {
    cy.get('input').should('be.empty');
    cy.get('form').find('button').should('be.disabled');
  });

  it('testing string recursion order', function () {
    cy.get('input').type('kost').should('have.value', 'kost');
    cy.get('form').find('button').should('not.be.disabled').click();

    cy.get(circlesIn).should('have.length', 4);

    cy.get(circlesIn).eq(0)
      .should('have.css', 'border-color', chngColor).contains('k');
    cy.get(circlesIn).eq(1)
      .should('have.css', 'border-color', dfltColor).contains('o');
    cy.get(circlesIn).eq(2)
      .should('have.css', 'border-color', dfltColor).contains('s');
    cy.get(circlesIn).eq(3)
      .should('have.css', 'border-color', chngColor).contains('t');

    cy.wait(1000);

    cy.get(circlesIn).eq(0)
      .should('have.css', 'border-color', modColor).contains('t');
    cy.get(circlesIn).eq(1)
      .should('have.css', 'border-color', chngColor).contains('o');
    cy.get(circlesIn).eq(2)
      .should('have.css', 'border-color', chngColor).contains('s');
    cy.get(circlesIn).eq(3)
      .should('have.css', 'border-color', modColor).contains('k');

    cy.wait(1000);

    cy.get(circlesIn).eq(0)
      .should('have.css', 'border-color', modColor).contains('t');
    cy.get(circlesIn).eq(1)
      .should('have.css', 'border-color', modColor).contains('s');
    cy.get(circlesIn).eq(2)
      .should('have.css', 'border-color', modColor).contains('o');
    cy.get(circlesIn).eq(3)
      .should('have.css', 'border-color', modColor).contains('k');

    cy.get('input').should('be.empty');
    cy.get('form').find('button').should('be.disabled');

  });

});
