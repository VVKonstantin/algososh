import { backToHeading } from "../../src/constants/test";

describe('app works correctly with routes', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000');
  });

  it("should open string-page and back", () => {
    cy.get('a[href*="recursion"]').click();
    cy.contains("Строка");
    cy.get(backToHeading).should('have.text', 'К оглавлению').click();
    cy.contains("Вдохновлено школами");
  });

  it("should open fibonacci-page and back", () => {
    cy.get('a[href*="fibonacci"]').click();
    cy.contains("Последовательность Фибоначчи");
    cy.get(backToHeading).should('have.text', 'К оглавлению').click();
    cy.contains("Вдохновлено школами");
  });

  it("should open sorting-page and back", () => {
    cy.get('a[href*="sorting"]').click();
    cy.contains("Сортировка массива");
    cy.get(backToHeading).should('have.text', 'К оглавлению').click();
    cy.contains("Вдохновлено школами");
  });

  it("should open stack-page and back", () => {
    cy.get('a[href*="stack"]').click();
    cy.contains("Стек");
    cy.get(backToHeading).should('have.text', 'К оглавлению').click();
    cy.contains("Вдохновлено школами");
  });

  it("should open queue-page and back", () => {
    cy.get('a[href*="queue"]').click();
    cy.contains("Очередь");
    cy.get(backToHeading).should('have.text', 'К оглавлению').click();
    cy.contains("Вдохновлено школами");
  });

  it("should open list-page and back", () => {
    cy.get('a[href*="list"]').click();
    cy.contains("Связный список");
    cy.get(backToHeading).should('have.text', 'К оглавлению').click();
    cy.contains("Вдохновлено школами");
  });
});
