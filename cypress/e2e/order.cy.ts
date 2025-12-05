describe('Создание заказа', function () {
  beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as(
      'createOrder'
    );
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as(
      'getUser'
    );

    window.localStorage.setItem('refreshToken', 'test-refresh-token');
    cy.setCookie('accessToken', 'test-access-token');

    cy.visit('http://localhost:4000');
    cy.wait('@getIngredients');
  });
  it('Создание заказа', function () {
    cy.clearAllLocalStorage();
    cy.clearCookies();
    cy.reload();

    cy.get('[test-id=bun-ingredients]').contains('Добавить').click();
    cy.get('[test-id=main-ingredients]').contains('Добавить').click();
    cy.get('[test-id=souce-ingredients]').contains('Добавить').click();

    cy.get('[test-id=button-order]').click();

    cy.url().should('include', '/login');

    cy.get('[test-id="email-input"]').type('test@mail.ru');
    cy.get('[test-id="password-input"]').type('123456');

    cy.intercept('POST', '**/auth/login', {
      statusCode: 200,
      body: {
        success: true,
        user: { email: 'test@mail.ru', name: 'Petr Petrov' },
        accessToken: 'test-access-token',
        refreshToken: 'test-refresh-token'
      }
    }).as('loginRequest');
    cy.get('[test-id="login-submit-button"]').click();

    cy.wait('@loginRequest');
    cy.url().should('eq', 'http://localhost:4000/');

    cy.get('[test-id=bun-ingredients]').contains('Добавить').click();
    cy.get('[test-id=main-ingredients]').contains('Добавить').click();
    cy.get('[test-id=souce-ingredients]').contains('Добавить').click();
    cy.get('[test-id=button-order]').click();

    cy.intercept('POST', '**/orders').as('createOrder');

    cy.wait('@createOrder').its('response.statusCode').should('eq', 200);
    cy.get('#modals [test-id=number-order]').should('contain', '123456');
    cy.get('#modals button[aria-label="Закрыть"]').click();
    cy.get('[test-id=constructor]').contains('Выберите булки').should('exist');
    cy.get('[test-id=constructor]')
      .contains('Выберите начинку')
      .should('exist');
  });
  afterEach(function () {
  cy.clearAllLocalStorage();
  cy.clearCookies();
});
});
