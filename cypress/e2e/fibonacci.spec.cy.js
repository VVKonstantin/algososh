import {
  circlesIn,
} from "../../src/constants/test"

describe('testing fibonacci', function () {

  it('if input is empty button should be disabled', function () {
    cy.visit('http://localhost:3000/#/fibonacci');
    cy.get('input').should('be.empty');
    cy.get('form').find('button').should('be.disabled');
  });

  it('testing string recursion algorithm', function () {

    cy.visit('http://localhost:3000/#/fibonacci');
    cy.get('input').type('5').should('have.value', '5');
    cy.get('form').find('button').should('not.be.disabled').click();

    cy.get(circlesIn).should('have.length', 1);
    cy.get(circlesIn).eq(0).contains('1');

    cy.wait(500);
    cy.get(circlesIn).should('have.length', 2);
    cy.get(circlesIn).eq(0).contains('1');
    cy.get(circlesIn).eq(1).contains('1');

    cy.wait(500);
    cy.get(circlesIn).should('have.length', 3);
    cy.get(circlesIn).eq(0).contains('1');
    cy.get(circlesIn).eq(1).contains('1');
    cy.get(circlesIn).eq(2).contains('2');

    cy.wait(500);
    cy.get(circlesIn).should('have.length', 4);
    cy.get(circlesIn).eq(0).contains('1');
    cy.get(circlesIn).eq(1).contains('1');
    cy.get(circlesIn).eq(2).contains('2');
    cy.get(circlesIn).eq(3).contains('3');

    cy.wait(500);
    cy.get(circlesIn).should('have.length', 5);
    cy.get(circlesIn).eq(0).contains('1');
    cy.get(circlesIn).eq(1).contains('1');
    cy.get(circlesIn).eq(2).contains('2');
    cy.get(circlesIn).eq(3).contains('3');
    cy.get(circlesIn).eq(4).contains('5');

    cy.wait(500);
    cy.get(circlesIn).should('have.length', 6);
    cy.get(circlesIn).eq(0).contains('1');
    cy.get(circlesIn).eq(1).contains('1');
    cy.get(circlesIn).eq(2).contains('2');
    cy.get(circlesIn).eq(3).contains('3');
    cy.get(circlesIn).eq(4).contains('5');
    cy.get(circlesIn).eq(5).contains('8');
  });

});
