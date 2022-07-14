//<reference types="cypress" />/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('Help Text', () => {

    let viewports = [Cypress.env('desktop')];

    beforeEach(() => {
        cy.visit('http://localhost:3000');
        cy.fixture('user_new.json').as('user_good');
    })

    afterEach(() => {
        cy.deleteUsersIfExist();
    });

    viewports.forEach(viewport => {
        context(`Testing the ${viewport} Version of the application`, () => {
            it('Testing Organization Service Elements', () => {
                cy.get('@user_good').then(user => {
                    cy.addUser(user).then(() => {
                        //cy.testHelpText(viewport, user);

                        //----Should be in help_text.js test steps file? How to get spec file to know about the function there?----
                        cy.viewport(viewport);
                        //cy.login(creds.email, creds.password);
                        cy.visit('http://localhost:3000/')
                        cy.get('[data-test-id="login-form-email-input"]').type('allisoneclay@yahoo.com')
                        cy.get('[placeholder="Password"]').type('A4yQyW7Ed32ig9z@')
                        cy.intercept('/v1/auth*').as('login')
                        cy.get('[data-test-id="login-form-submit-button"]').click()
                        cy.wait('@login')
                        cy.visit('http://localhost:3000/organizations/5e7e4bd9d54f1760921a3c3d/services/5e7e4bd9d54f1760921a3c5e')
                        cy.get('[data-test-id="service-tab-properties"]').click()
                        cy.contains('Before adding a community property to a service, ask yourself: ‘Does this organization/service have expertise and experience in serving this particular community?’ (Note: ‘We serve everyone’ does not count as demonstrated expertise for our purposes at InReach.)')

                    })
                })
            })
        })
    })
    //cy.testHelpText(viewport,user);
})