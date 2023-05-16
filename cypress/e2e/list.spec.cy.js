import {
  dfltColor,
  chngColor,
  modColor,
  inputVal,
  inputIndex,
  btnAddHead,
  btnAddTail,
  btnDelHead,
  btnDelTail,
  btnAddIndex,
  btnDelIndex,
  circlesExt,
  circlesIn,
  circlesSmall
} from "../../src/constants/test"

describe('testing linked list operations', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000/#/list');
  });

  it('if inputs are empty add and del by index buttons should be disabled', function () {
    cy.get(inputVal).should('be.empty');
    cy.get('form').find(btnAddHead).should('be.disabled');
    cy.get('form').find(btnAddTail).should('be.disabled');

    cy.get(inputIndex).should('be.empty');
    cy.get('form').find(btnAddIndex).should('be.disabled');
    cy.get('form').find(btnDelIndex).should('be.disabled');
  });

  it('render the default linked list', function () {

    cy.get(circlesIn).should('have.length', 4);
    cy.get(circlesIn).should('have.css', 'border-color', dfltColor);
    cy.get(circlesIn).eq(0).contains('0');
    cy.get(circlesIn).eq(1).contains('34');
    cy.get(circlesIn).eq(2).contains('8');
    cy.get(circlesIn).eq(3).contains('1');

    cy.get(circlesExt).eq(0).contains('head');
    cy.get(circlesExt).eq(3).contains('tail');
  });

  it('adding the linked list head', function () {
    cy.get(inputVal).type('1').should('have.value', '1');
    cy.get('form').find(btnAddHead).should('not.be.disabled').click();

    cy.get(circlesSmall)
      .should('have.css', 'border-color', chngColor).contains('1');
    cy.get(circlesSmall).should('have.length', 1);

    cy.wait(500);
    cy.get(circlesExt).should('have.length', 5);
    cy.get(circlesExt).eq(0).contains('head');
    cy.get(circlesExt).eq(4).contains('tail');
    cy.get(circlesIn).eq(0).should('have.css', 'border-color', modColor);
    cy.get(circlesIn).eq(0).contains('1');
    cy.get(circlesIn).eq(1).contains('0');
    cy.get(circlesIn).eq(2).contains('34');
    cy.get(circlesIn).eq(3).contains('8');
    cy.get(circlesIn).eq(4).contains('1');

    cy.wait(500);
    cy.get(circlesExt).should('have.length', 5);
    cy.get(circlesIn).should('have.css', 'border-color', dfltColor);

  });

  it('adding the linked list tail', function () {
    cy.get(inputVal).type('33').should('have.value', '33');
    cy.get('form').find(btnAddTail).should('not.be.disabled').click();

    cy.get(circlesSmall)
      .should('have.css', 'border-color', chngColor).contains('33');
    cy.get(circlesSmall).should('have.length', 1);

    cy.wait(500);
    cy.get(circlesExt).should('have.length', 5);
    cy.get(circlesExt).eq(0).contains('head');
    cy.get(circlesExt).eq(4).contains('tail');
    cy.get(circlesIn).eq(4).should('have.css', 'border-color', modColor);
    cy.get(circlesIn).eq(0).contains('0');
    cy.get(circlesIn).eq(1).contains('34');
    cy.get(circlesIn).eq(2).contains('8');
    cy.get(circlesIn).eq(3).contains('1');
    cy.get(circlesIn).eq(4).contains('33');

    cy.wait(500);
    cy.get(circlesExt).should('have.length', 5);
    cy.get(circlesIn).should('have.css', 'border-color', dfltColor);
  });

  it('adding an element to the linked list by index', function () {
    cy.get(inputVal).type('22').should('have.value', '22');
    cy.get(inputIndex).type('2').should('have.value', '2');
    cy.get('form').find(btnAddIndex).should('not.be.disabled').click();

    for (let i = 0; i < 2; i++) {
      cy.get(circlesSmall).contains('22');
      cy.get(circlesSmall).should('have.length', 1);
      cy.get(circlesIn).eq(i).should('have.css', 'border-color', chngColor);
      cy.wait(500);
    }

    cy.get(circlesIn).eq(2).should('have.css', 'border-color', modColor).contains('22');

    cy.wait(500);
    cy.get(circlesIn).eq(0).contains('0');
    cy.get(circlesIn).eq(1).contains('34');
    cy.get(circlesIn).eq(2).contains('22');
    cy.get(circlesIn).eq(3).contains('8');
    cy.get(circlesIn).eq(4).contains('1');
    cy.get(circlesIn).should('have.css', 'border-color', dfltColor);

  });

  it('removing the linked list head', function () {

    cy.get('form').find(btnDelHead).should('not.be.disabled').click();

    cy.get(circlesSmall)
      .should('have.css', 'border-color', chngColor).contains('0');
    cy.get(circlesSmall).should('have.length', 1);
    cy.get(circlesIn).eq(0)
      .should('have.css', 'border-color', dfltColor).should('have.text', '');

    cy.wait(500);
    cy.get(circlesIn).should('have.css', 'border-color', dfltColor);
    cy.get(circlesExt).should('have.length', 3);
    cy.get(circlesExt).eq(0).contains('head');
    cy.get(circlesExt).eq(2).contains('tail');
    cy.get(circlesIn).eq(0).contains('34');
    cy.get(circlesIn).eq(1).contains('8');
    cy.get(circlesIn).eq(2).contains('1');
  });

  it('removing the linked list tail', function () {

    cy.get('form').find(btnDelTail).should('not.be.disabled').click();

    cy.get(circlesSmall)
      .should('have.css', 'border-color', chngColor).contains('1');
    cy.get(circlesSmall).should('have.length', 1);
    cy.get(circlesIn).eq(3)
      .should('have.css', 'border-color', dfltColor).should('have.text', '');

    cy.wait(500);
    cy.get(circlesIn).should('have.css', 'border-color', dfltColor);
    cy.get(circlesExt).should('have.length', 3);
    cy.get(circlesExt).eq(0).contains('head');
    cy.get(circlesExt).eq(2).contains('tail');
    cy.get(circlesIn).eq(0).contains('0');
    cy.get(circlesIn).eq(1).contains('34');
    cy.get(circlesIn).eq(2).contains('8');
  });

  it('removing an element to the linked list by index', function () {
    cy.get(inputIndex).type('2').should('have.value', '2');
    cy.get('form').find(btnDelIndex).should('not.be.disabled').click();

    for (let i = 0; i < 3; i++) {
      cy.get(circlesIn).eq(i).should('have.css', 'border-color', chngColor);
      cy.wait(500);
    }

    cy.get(circlesSmall)
      .should('have.css', 'border-color', chngColor).should('have.length', 1).contains('8');
    cy.get(circlesIn).eq(2)
      .should('have.css', 'border-color', dfltColor).should('have.text', '');

    cy.wait(500);
    cy.get(circlesIn).should('have.css', 'border-color', dfltColor);
    cy.get(circlesExt).should('have.length', 3);
    cy.get(circlesExt).eq(0).contains('head');
    cy.get(circlesExt).eq(2).contains('tail');
    cy.get(circlesIn).eq(0).contains('0');
    cy.get(circlesIn).eq(1).contains('34');
    cy.get(circlesIn).eq(2).contains('1');
  });

});
