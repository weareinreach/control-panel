/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/// <reference types="cypress" />
//compound url

//Test Suite
describe('Admin Form Tests', () => {

    let viewports = [Cypress.env('desktop')];

    beforeEach(() => {
        cy.visit(Cypress.env('baseUrl'));
        cy.fixture('user_owner.json').as('user_owner');
        cy.fixture('organization_suggestion.json').as('organization');
        cy.fixture('user_new.json').as('user_good');
    });
    afterEach(() => {
        cy.deleteUsersIfExist();
        cy.deleteOrgsIfExist();
    });

    viewports.forEach(viewport => {
        context(`Testing the ${viewport} Version of the application`, () => {
            it.only('Test View Organization From Affiliate Pending', () => {
                cy.get('@user_owner').then(owner => {
                    cy.get('@user_good').then(user => {
                        cy.addUser(user).then(() => {
                            cy.addUser(owner).then(createdOwner => {
                                cy.get('@organization').then(org => {
                                    cy.createOwnerObject(createdOwner.body.userInfo).then(ownerObject => {
                                        //Add Pending Onwner
                                        org.owners.push(ownerObject);
                                        cy.addOrg(org).then(createdOrganization => {
                                            cy.testViewOrganizationFromAffiliatePending(viewport, user, createdOrganization.body.organization);
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });

});