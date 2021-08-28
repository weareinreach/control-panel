/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/// <reference types="cypress" />

//compound url

//Test Suite
describe('Admin Form Tests', () => {

    let viewports = [Cypress.env('desktop'),Cypress.env('tablet'),Cypress.env('mobile')];

    beforeEach(() => {
        cy.visit(Cypress.env('baseUrl'));
        cy.fixture('user_new.json').as('user_good');
        cy.fixture('organization_search.json').as('organization');
        cy.fixture('admin_new.json').as('admin');
    });
    afterEach(() => {
        cy.deleteUsersIfExist();
    });

    viewports.forEach(viewport=>{
        context(`Testing the ${viewport} Version of the application`,()=>{
           it('Test Admin Elements',()=>{
            cy.get('@user_good').then(user => {
                cy.addUser(user).then(()=>{
                    cy.testAdminPageElements(viewport,user);
                });
            });
           });
           it('Test Admin Filter Users',()=>{
            cy.get('@user_good').then(user => {
                cy.addUser(user).then(()=>{
                    cy.testAdminFilterUsers(viewport,user);
               });
            });
           });
           it('Test Adding New Manager',()=>{
            cy.get('@user_good').then(user => {
                cy.addUser(user).then(()=>{
                    cy.get('@admin').then(admin=>{
                        cy.testAdminFilterAddNewManagerAction(viewport,user,admin);
                    });
                });
            });
           });
        });
    });
});