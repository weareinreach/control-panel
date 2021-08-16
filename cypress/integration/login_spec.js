/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/// <reference types="cypress" />

//compound url

//Test Suite
describe('Home Page Login Form Tests', () => {

    let viewports = [Cypress.env('desktop'),Cypress.env('tablet'),Cypress.env('mobile')];

    beforeEach(() => {
        cy.visit(Cypress.env('baseUrl'));
        cy.fixture('login_creds_good.json').as('user_good');
        cy.fixture('login_creds_bad.json').as('user_bad');
    });
    afterEach(() => {
    });

    viewports.forEach(viewport=>{
        context(`Testing the ${viewport} Version of the application`,()=>{
            it('Testing Login Form Elements',() => {
                cy.testLoginPageElements(viewport);
            });
            it('Testing Login Bad Creds',()=>{
                cy.get('@user_bad').then(creds => {
                    cy.testLoginPageLoginActionBadCreds(viewport,creds);
                });
            });
            // it('Testing Login Good Creds',()=>{
            //     cy.get('@user_good').then(creds => {
            //         cy.testLoginPageLoginAction(viewport,creds);
            //     });
            // });
        });
    });
});
