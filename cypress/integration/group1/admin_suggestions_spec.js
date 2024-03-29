/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/// <reference types="cypress" />
//compound url

//Test Suite
describe('Admin Suggestions Form Tests', () => {

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
            it('Test Suggestions Elements', () => {
                    cy.get('@user_good').then(user => {
                        cy.addUser(user).then(() => {
                            cy.testAdminSuggestionElements(viewport, user);  
                    });
                });
            });
            it('Test Suggestions Affiliate Pending - Approve affiliate',()=>{
                cy.get('@user_good').then(user => {
                    cy.addUser(user).then(() => {
                        cy.get('@organization').then(org => {
                               cy.get('@user_owner').then(owner=>{
                                   cy.addUser(owner).then(createdOwner=>{
                                        cy.testAffiliatePendingApproveDecline(viewport, user,org,createdOwner,1);
                                   });
                             }); 
                        });
                    });
                });
            });
            it('Test Suggestions Affiliate Pending - Decline affiliate',()=>{
                cy.get('@user_good').then(user => {
                    cy.addUser(user).then(() => {
                        cy.get('@organization').then(org => {
                               cy.get('@user_owner').then(owner=>{
                                   cy.addUser(owner).then(createdOwner=>{
                                        cy.testAffiliatePendingApproveDecline(viewport, user,org,createdOwner,0);
                                   });
                             }); 
                        });
                    });
                });
            });
            it('Test Suggestion Suggested Edits - View Organizations',()=>{
                cy.get('@user_good').then(user => {
                    cy.addUser(user).then((createdUser) => {
                        cy.get('@organization').then(org=>{
                            cy.addOrg(org).then((createdOrgResponse)=>{
                                cy.get('@suggested_edit').then(suggestion=>{
                                    cy.createSuggestionObject(createdOrgResponse.body.organization._id,createdUser.body.userInfo.email,suggestion).then(suggestionObject=>{
                                        cy.testViewDeclineSuggest(viewport,user,createdOrgResponse.body.organization,suggestionObject,1);
                                    });   
                                });
                            });
                        });
                    });
                });
            });
            it('Test Suggestion Suggested Edits - Delete Suggestion',()=>{
                cy.get('@user_good').then(user => {
                    cy.addUser(user).then((createdUser) => {
                        cy.get('@organization').then(org=>{
                            cy.addOrg(org).then((createdOrgResponse)=>{
                                cy.get('@suggested_edit').then(suggestion=>{
                                    cy.createSuggestionObject(createdOrgResponse.body.organization._id,createdUser.body.userInfo.email,suggestion).then(suggestionObject=>{
                                        cy.testViewDeclineSuggest(viewport,user,createdOrgResponse.body.organization,suggestionObject,0);
                                    });   
                                });
                            });
                        });
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