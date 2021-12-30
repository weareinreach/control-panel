/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/// <reference types="cypress" />

//compound url

//Test Suite
describe('Header Form Tests', () => {

    let viewports = [Cypress.env('desktop')];

    beforeEach(() => {
        cy.visit(Cypress.env('baseUrl'));
        cy.fixture('user_new.json').as('user_good');
    });
    afterEach(() => {
        cy.deleteUsersIfExist();
    });

    viewports.forEach(viewport=>{
        context(`Testing the ${viewport} Version of the application`,()=>{
            it('Testing Header Elements',() => {
                cy.testHeaderElementsNoLogin(viewport);
            });
            it('Testing Header Elements After Login',()=>{
                cy.get('@user_good').then(user=>{
                    cy.addUser(user).then(()=>{
                        cy.testHeaderElementsLogin(viewport,user);
                    });
                }); 
            });
        });
    });
});