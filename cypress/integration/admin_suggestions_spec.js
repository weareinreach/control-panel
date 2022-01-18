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
        cy.fixture('suggested_edit.json').as('suggested_edit');
    });
    afterEach(() => {
        cy.deleteSuggestionsIfExists();
        cy.deleteUsersIfExist();
        cy.deleteOrgsIfExist();
    });

    viewports.forEach(viewport => {
        context(`Testing the ${viewport} Version of the application`, () => {
            it('Test Suggestions Affiliate Pending - With pending affiliates', () => {
                cy.get('@user_owner').then(owner => {
                    cy.get('@user_good').then(user => {
                        cy.addUser(user).then(() => {
                            cy.addUser(owner).then(createdOwner => {
                                cy.get('@organization').then(org => {
                                    cy.createOwnerObject(createdOwner.body.userInfo).then(ownerObject => {
                                        //Add Pending Onwner
                                        org.owners.push(ownerObject);
                                        cy.addOrg(org).then(createdOrganization => {
                                            cy.testAffiliatePendingElements(viewport, user, createdOrganization.body.organization);
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
            it('Test Suggestions Affiliate Pending - With no pending affiliates',()=>{
                cy.get('@user_good').then(user => {
                    cy.addUser(user).then(() => {
                            cy.testAffiliatePendingElements(viewport, user, null);
                    });
                });
            });
            // it.only('Test Suggestion Suggested Edits - With Suggested Edits',()=>{
            //     cy.get('@user_good').then(user => {
            //         cy.addUser(user).then((createdUser)=>{
            //             cy.get('@organization').then(org => {
            //                 cy.addOrg(org).then(createdOrganization => {
            //                     cy.get('@suggested_edit').then(suggestion=>{
            //                         cy.createSuggestionObject(createdOrganization.body.organization._id,createdUser.body.userInfo.email,suggestion).then(suggestionObject=>{
            //                             cy.addSuggestion(suggestionObject).then(()=>{
            //                                 cy.
            //                             });
            //                         });
            //                     });
            //                 });
            //             });
            //         });
            //     });
            // });
        });
        
    });

});