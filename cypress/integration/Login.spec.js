/// <reference types="Cypress" />
/* eslint-disable no-undef */
/* eslint-disable jest/valid-expect-in-promise */


describe('login', () => {
  it('should successfully log into our app', () => {
    cy.login()
      .then((resp) => {
        return resp.body;
      })
      .then((body) => {
        // const { access_token, expires_in, id_token } = body;
        // const auth0State = {
        //   nonce: '',
        //   state: 'some-random-state'
        // };
        // const callbackUrl = `http://localhost:3000/callback#access_token=${access_token}&scope=openid&id_token=${id_token}&expires_in=${expires_in}&token_type=Bearer&state=${auth0State.state}`;
        // cy.visit(callbackUrl, {
        //   onBeforeLoad(win) {
        //     win.document.cookie = 'com.auth0.auth.some-random-state=' + JSON.stringify(auth0State);
        //   }
        // }).then(() => {
        // cy.get('[data-cy=button-login]').click();
        cy.url().should('eq', callbackUrl).then(() => {
          cy.get("button").contains('Iniciar sesión').click().wait(2000).then(() => {
            cy.get("button > p").should('contain', 'AAAAAAAAAAAAAAAAAA');
            cy.get('#dropdown-activator').click()
            cy.get('button').should('be.visible')
            // cy.wait(2000).then(() => {
            //   // eslint-disable-next-line jest/valid-expect
            // })
          });
          // })
        });
      })
  });
});