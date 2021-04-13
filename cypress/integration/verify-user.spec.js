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

describe('Verify company settings', () => {
  it('should render as admin', () => {
    cy.login({ targetURL: baseUrl, user: admin.role })
      .then(() => {
        cy.get('#dropdown-activator').should('be.visible');
        cy.get('#dropdown-activator').click();
        cy.get('[data-cy=adset]').should('be.visible');
        cy.get('[data-testid=logout]').should('contain', "Salir").click();
      });
  })
  it('should not render as common user', () => {
    cy.login({ targetURL: baseUrl, user: user.role })
      .then(() => {
        cy.get('#dropdown-activator').should('be.visible');
        cy.get('#dropdown-activator').click();
        cy.get(".settings").should('not.contain', 'Company settings');
        cy.get('[data-testid=logout]').should('contain', "Salir").click()
      });
  })
})