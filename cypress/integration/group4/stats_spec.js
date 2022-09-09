/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/// <reference types="cypress" />

//compound url

//Test Suite
describe('Home Page Login Form Tests', () => {

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
           it('Test Stats Elements',()=>{
            cy.get('@user_good').then(user => {
                cy.addUser(user).then(()=>{
                    cy.testStatsPageElements(viewport,user);
               });
            });
           });
           it('Test Stats Tabs',()=>{
            cy.get('@user_good').then(user => {
                cy.addUser(user).then(()=>{
                    cy.testStatsTabs(viewport,user);
               });
            });
           });
        });
    });

});