import {
  dfltColor,
  chngColor,
  btnAddQueue,
  btnDelQueue,
  btnClrQueue,
  circlesExt,
  circlesIn
} from "../../src/constants/test"

describe('testing queue operations', function () {

  beforeEach(function () {
    cy.visit('http://localhost:3000/#/queue');
  });

  it('if input is empty add button should be disabled', function () {
    cy.get('input').should('be.empty');
    cy.get('form').find(btnAddQueue).should('be.disabled');
  });

  it('testing adding an element to the queue', function () {

    cy.get(circlesIn).should('have.length', 7);

    for (let i = 1; i < 3; i++) {
      cy.get('input').type(i).should('have.value', i);
      cy.get('form').find(btnAddQueue).should('not.be.disabled').click();

      cy.get(circlesIn).eq(i - 1)
        .should('have.css', 'border-color', chngColor);

      cy.wait(500);
      cy.get(circlesIn).should('have.length', 7);
      cy.get(circlesIn).eq(i - 1)
        .should('have.css', 'border-color', chngColor).contains(i);
      cy.get(circlesExt).eq(0)
        .contains('head');
      cy.get(circlesExt).eq(i - 1)
        .contains('tail');

      cy.wait(500);
      cy.get(circlesIn).should('have.length', 7);
      cy.get(circlesIn).eq(i - 1)
        .should('have.css', 'border-color', dfltColor).contains(i);
    }

  });

  it('testing deleting an element from the queue', function () {

    cy.get(circlesIn).should('have.length', 7);

    for (let i = 1; i < 3; i++) {
      cy.get('input').type(i).should('have.value', i);
      cy.get('form').find(btnAddQueue).should('not.be.disabled').click();
    }

    cy.get('form').find(btnDelQueue).should('not.be.disabled').click();

    cy.get(circlesIn).should('have.length', 7);
    cy.get(circlesIn).eq(0)
      .should('have.css', 'border-color', chngColor).contains('1');
    cy.get(circlesExt).eq(0)
      .contains('head');
    cy.get(circlesExt).eq(1)
      .contains('tail');

    cy.wait(500);
    cy.get(circlesIn).should('have.length', 7);
    cy.get(circlesIn).eq(0)
      .should('have.css', 'border-color', dfltColor).should('have.text', '');
    cy.get(circlesExt).eq(1)
      .contains('head');
    cy.get(circlesExt).eq(1)
      .contains('tail');
  });

  it('testing clearing the queue', function () {

    cy.get(circlesIn).should('have.length', 7);

    for (let i = 1; i < 4; i++) {
      cy.get('input').type(i).should('have.value', i);
      cy.get('form').find(btnAddQueue).should('not.be.disabled').click();
    }

    cy.get('form').find(btnClrQueue)
      .should('not.be.disabled').click();

    cy.get(circlesIn).should('have.length', 7);
    cy.get(circlesIn).should('have.css', 'border-color', dfltColor)
      .should('have.text', '');
    cy.get('form').find(btnAddQueue)
      .should('be.disabled');
    cy.get('form').find(btnDelQueue)
      .should('be.disabled');
    cy.get('form').find(btnClrQueue)
      .should('be.disabled');
  });

});
