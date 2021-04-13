import jwt_decode from "jwt-decode";
import "cypress-localstorage-commands";
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

Cypress.Commands.add(
  "login",
  ({
    targetUrl = "http://localhost:3000",
    user = "user"
  } = {}) => {
    const client_id = Cypress.env("auth_client_id"),
      client_secret = Cypress.env("auth_client_secret"),
      audience = Cypress.env("auth_audience"),
      scope = "openid profile email offline_access",
      username = user === 'user' ? Cypress.env("auth_username") : Cypress.env('auth_username_admin'),
      password = user === 'user' ? Cypress.env("auth_password") : Cypress.env('auth_password_admin');
    cy.log(`Logging in as ${username}`);

    const options = {
      method: "POST",
      url: Cypress.env("auth_url"),
      form: true,
      body: {
        grant_type: "password",
        username,
        password,
        audience,
        client_id,
        client_secret,
        scope
      }
    };

    cy.request(options).then(({ body }) => {
      const { access_token, expires_in, id_token } = body;
      const [header, payload, signature] = id_token.split(".");
      const tokenData = jwt_decode(id_token);
      const tokenDataHeader = jwt_decode(id_token, { header: true });
      const key = `@@auth0spajs@@::${client_id}::${audience}::${scope}`;
      const auth0Cache = {
        body: {
          client_id,
          access_token,
          id_token,
          scope,
          expires_in,
          decodedToken: {
            encoded: { header, payload, signature },
            header: tokenDataHeader,
            // below is returned by getIdTokenClaims
            claims: {
              __raw: id_token,
              ...tokenData
            },
            user: tokenData
          }
        },
        expiresAt: Math.floor(Date.now() / 1000) + expires_in
      };
      cy.setLocalStorage(key, JSON.stringify(auth0Cache));
      cy.visit(targetUrl).then(() => {
        cy.get('[data-cy=button-login]').click().then(() => {
          cy.location().then(url => {
            if (url.href.includes('https://viaducto-jl-rojas.us.auth0.com/')) {
              cy.get('input#username').type(username);
              cy.get("input#password").type(password).type('{enter}')
            }
          })
        })
      });
    });
  }
);