import {
  dfltColor,
  chngColor,
  btnAddStack,
  btnDelStack,
  btnClrStack,
  circlesIn
} from "../../src/constants/test"

describe('testing stack operations', function () {

  beforeEach(function () {
    cy.visit('http://localhost:3000/#/stack');
  });

  it('if input is empty add button should be disabled', function () {
    cy.get('input').should('be.empty');
    cy.get('form').find(btnAddStack).should('be.disabled');
  });

  it('adding to stack', function () {

    cy.get('input').type('1').should('have.value', '1');
    cy.get('form').find(btnAddStack).should('not.be.disabled').click();

    cy.get(circlesIn).should('have.length', 1);
    cy.get(circlesIn).eq(0)
      .should('have.css', 'border-color', chngColor).contains('1');
    cy.wait(500);
    cy.get(circlesIn).eq(0)
      .should('have.css', 'border-color', dfltColor).contains('1');

    cy.get('input').type('3').should('have.value', '3');
    cy.get('form').find(btnAddStack).should('not.be.disabled').click();

    cy.get(circlesIn).should('have.length', 2);
    cy.get(circlesIn).eq(0)
      .should('have.css', 'border-color', dfltColor).contains('1');
    cy.get(circlesIn).eq(1)
      .should('have.css', 'border-color', chngColor).contains('3');
    cy.wait(500);
    cy.get(circlesIn).eq(0)
      .should('have.css', 'border-color', dfltColor).contains('1');
    cy.get(circlesIn).eq(1)
      .should('have.css', 'border-color', dfltColor).contains('3');
  });

  it('removing from the stack', function () {

    cy.get('input').type('1').should('have.value', '1');
    cy.get('form').find(btnAddStack).should('not.be.disabled').click();

    cy.get('form').find(btnDelStack).should('not.be.disabled').click();
    cy.get(circlesIn).should('have.length', 1);
    cy.get(circlesIn).eq(0)
      .should('have.css', 'border-color', chngColor).contains('1');
    cy.wait(500);
    cy.get(circlesIn).should('have.length', 0);
  });

  it('clearing stack', function () {

    cy.get('input').type('1').should('have.value', '1');
    cy.get('form').find(btnAddStack).should('not.be.disabled').click();
    cy.get('input').type('3').should('have.value', '3');
    cy.get('form').find(btnAddStack).should('not.be.disabled').click();
    cy.get(circlesIn).should('have.length', 2);

    cy.get('form').find(btnClrStack).should('not.be.disabled').click();
    cy.get(circlesIn).should('have.length', 2);
    cy.get(circlesIn).eq(0)
      .should('have.css', 'border-color', chngColor).contains('1');
    cy.get(circlesIn).eq(1)
      .should('have.css', 'border-color', chngColor).contains('3');
    cy.wait(500);
    cy.get(circlesIn).should('have.length', 0);
  });

});
