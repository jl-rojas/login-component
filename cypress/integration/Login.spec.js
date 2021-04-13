/// <reference types="Cypress" />
/* eslint-disable no-undef */
/* eslint-disable jest/valid-expect-in-promise */

let
  admin = {
    role: 'admin',
    name: "Admin"
  },
  user = {
    role: "user",
    name: "AAAAAAAAAAAAAAAAAA"
  },
  baseUrl = "http://localhost:3000";

describe('Login', () => {
  it('should successfully log into our app as admin', () => {
    cy.login({ targetURL: baseUrl, user: admin.role })
      .then(() => {
        cy.get("button > p").should('contain', admin.name);
        cy.get('#dropdown-activator').click()
        cy.get('button').should('be.visible')
        cy.get('[data-testid=logout]').should('contain', "Salir").click().then(() => {
          cy.get('[data-cy=button-login]').should('contain', 'Iniciar sesión')
        })
      });
  });
  it('should successfully log into our app as common user', () => {
    cy.login({ targetURL: baseUrl, user: user.role })
      .then(() => {
        cy.get("button > p").should('contain', user.name);
        cy.get('#dropdown-activator').click()
        cy.get('button').should('be.visible')
        cy.get('[data-testid=logout]').should('contain', "Salir").click().then(() => {
          cy.get('[data-cy=button-login]').should('contain', 'Iniciar sesión')
        })
      });
  });
});

describe('Log out', () => {
  it('should successfully log out of our app as admin', () => {
    cy.login({ targetURL: baseUrl, user: admin.role })
      .then(() => {
        cy.get("button > p").should('contain', admin.name);
        cy.get('#dropdown-activator').click()

        cy.get('[data-testid=logout]').should('contain', "Salir").click().then(() => {
          cy.get('[data-cy=button-login]').should('contain', 'Iniciar sesión')
        })
      });
  });
  it('should successfully log out of our app as common user', () => {
    cy.login({ targetURL: baseUrl, user: user.role })
      .then(() => {
        cy.get("button > p").should('contain', user.name);
        cy.get('#dropdown-activator').click()
        cy.get('[data-testid=logout]').should('contain', "Salir").click().then(() => {
          cy.get('[data-cy=button-login]').should('contain', 'Iniciar sesión')
        })
      });
  });
})