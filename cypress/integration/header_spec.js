/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/// <reference types="cypress" />

//compound url

//Test Suite
describe('Home Page Login Form Tests', () => {

    let viewports = [Cypress.env('desktop'),Cypress.env('tablet'),Cypress.env('mobile')];

    beforeEach(() => {
        cy.visit(Cypress.env('baseUrl'));
    });
    afterEach(() => {
    });

    viewports.forEach(viewport=>{
        context(`Testing the ${viewport} Version of the application`,()=>{
            it('Testing Header Form Elements',() => {
                cy.testHeaderElementsNoLogin(viewport);
            });
        });
    });
});