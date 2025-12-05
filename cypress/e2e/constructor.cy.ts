/// <reference types="cypress" />

describe('Работа конструктора', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.visit('http://localhost:4000');
    cy.wait('@getIngredients');
  });

  it('добавление булки', function () {
    cy.get('[test-id=constructor]').contains('Булки').should('exist');
    cy.get('[test-id=bun-ingredients]').contains('Добавить').click();
    cy.get('[test-id=constructor-ingredient]')
      .contains('Краторная булка N-200i')
      .should('exist');
    cy.get('[test-id=bun-top]').should('exist');
    cy.get('[test-id=bun-bottom]').should('exist');
  });

  it('добавление начинки', function () {
    cy.get('[test-id=constructor]').contains('Начинки').should('exist').click();
    cy.get('[test-id=main-ingredients]').contains('Добавить').click();
    cy.get('[test-id=main-ingredients]').should('exist');
    cy.get('[test-id=constructor-ingredient]')
      .contains('Филе Люминесцентного тетраодонтимформа')
      .should('exist');
  });

  it('добавление нескольких ингредиентов', function () {
    cy.get('[test-id=bun-ingredients]').contains('Добавить').click();
    cy.get('[test-id=main-ingredients]').contains('Добавить').click();
    cy.get('[test-id=souce-ingredients]').contains('Добавить').click();
    cy.get('[test-id=constructor-ingredient]')
      .contains('Краторная булка N-200i')
      .should('exist');
    cy.get('[test-id=constructor-ingredient]')
      .contains('Филе Люминесцентного тетраодонтимформа')
      .should('exist');
    cy.get('[test-id=constructor-ingredient]')
      .contains('Соус Spicy-X')
      .should('exist');
  });
});

describe('Модальное окно ингредиента', function () {
  beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.visit('http://localhost:4000');
    cy.wait('@getIngredients');
  });

  it('открытие модального окна ингредиента', function () {
    cy.contains('Детали ингредиента').should('not.exist');
    cy.contains('Краторная булка N-200i').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('#modals').contains('Краторная булка N-200i').should('exist');
    cy.contains('Калории, ккал').should('exist');
    cy.contains('Белки, г').should('exist');
    cy.contains('Жиры, г').should('exist');
    cy.contains('Углеводы, г').should('exist');
  });

  it('закрытие модального окна по клику на крестик', function () {
    cy.contains('Краторная булка N-200i').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('#modals button[aria-label="Закрыть"]').click();
    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('закрытие модального окна по клику на оверлей', function () {
    cy.contains('Краторная булка N-200i').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('[test-id=modal-overlay]').click({ force: true });
    cy.contains('Детали ингредиента').should('not.exist');
  });
  
});
