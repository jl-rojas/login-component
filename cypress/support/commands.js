/* eslint-disable no-undef */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (overrides = {}) => {
  Cypress.log({
    name: 'loginViaAuth0',
  });

  const options = {
    method: 'POST',
    url: Cypress.env('auth_url'),
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      grant_type: 'password',
      username: Cypress.env('auth_username'),
      password: Cypress.env('auth_password'),
      audience: Cypress.env('auth_audience'),
      scope: 'openid profile email',
      client_id: Cypress.env('auth_client_id'),
      client_secret: Cypress.env('auth_client_secret'),
    },
  };
  cy.request(options);
});

Cypress.Commands.add(
  'log',
  (appState = { target: '/' }) => {
    cy.log(`Logging in as ${Cypress.env('auth_username')}`);
    const options = {
      method: 'POST',
      url: Cypress.env('auth_url'),
      body: {
        grant_type: 'password',
        username: Cypress.env('auth_username'),
        password: Cypress.env('auth_password'),
        audience: Cypress.env('auth_audience'),
        scope: 'openid profile email',
        client_id: Cypress.env('auth_client_id'),
        client_secret: Cypress.env('auth_client_secret')
      }
    };
    cy.request(options).then(({ body }) => {
      const { access_token, expires_in, id_token } = body;

      // intercept Auth0 request for token and return what we have
      cy.intercept({
        url: Cypress.env('auth_url'),
        method: 'POST',
        response: {
          access_token,
          expires_in,
          id_token,
          token_type: 'Bearer'
        }
      });

      // Auth0 SPA SDK will check for value in cookie to get appState
      // and validate nonce (which has been removed for simplicity)
      const stateId = 'test';
      const encodedAppState = encodeURI(JSON.stringify(appState));
      cy.setCookie(
        `a0.spajs.txs.${stateId}`,
        `{%22appState%22:${encodedAppState}%2C%22scope%22:%22openid%20profile%20email%22%2C%22audience%22:%22default%22}`
      );

      const callbackUrl = `http://localhost:3000/callback?code=test-code&state=${stateId}`;
      return cy.visit(callbackUrl);
    });
  }
);