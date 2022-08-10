/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/// <reference types="cypress" />

//compound url

//Test Suite
describe('Service Properties Tab Tests', () => {

    let viewports = [Cypress.env('desktop')];

    beforeEach(() => {
        cy.visit(Cypress.env('baseUrl'));
        cy.fixture('user_new.json').as('user_good');
        cy.fixture('organization.json').as('organization');
    });
    afterEach(() => {
        cy.deleteUsersIfExist();
        cy.deleteOrgsIfExist();
    });

    viewports.forEach(viewport => {
        context(`Testing the ${viewport} Version of the application`, () => {
            it('Testing Services Properties Tab Elements', () => {
                cy.get('@user_good').then(user => {
                    cy.addUser(user).then(() => {
                        cy.get('@organization').then(org => {
                            cy.testingServicesPropertiesTabElements(viewport, user, org);
                        });
                    });
                });
            });
        });
    });
});