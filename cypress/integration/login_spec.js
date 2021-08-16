/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/// <reference types="cypress" />

//compound url

//Test Suite
describe('Home Page Login Form Tests', () => {

    let viewports = [Cypress.env('desktop'),Cypress.env('tablet'),Cypress.env('mobile')];

    beforeEach(() => {
        cy.visit(Cypress.env('baseUrl'));
        cy.fixture('user_new.json').as('user_good');
    });
    afterEach(() => {
        cy.deleteUsersIfExist();
    });

    viewports.forEach(viewport=>{
        context(`Testing the ${viewport} Version of the application`,()=>{
            it('Testing Login Form Elements',() => {
                cy.testLoginPageElements(viewport);
            });
            it('Testing Login Bad Creds',()=>{
                cy.testLoginPageLoginActionBadCreds(viewport,'bogusemail@gmail.com','password');
            });
            it('Testing Login Good Creds',()=>{
                cy.get('@user_good').then(user => {
                    cy.addUser(user).then(()=>{
                        cy.testLoginPageLoginActionGoodCreds(viewport,user.email,user.password);
                    });
                });
            });
        });
    });
});
