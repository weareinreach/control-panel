Cypress.Commands.add('testHelpText', (viewport, creds) => {
    //describe('Help Text', () => {
    //it('Find Help Text', () => {
    //  cy.visit('http://localhost:3000/')
    //  cy.get('[data-test-id="login-form-email-input"]').type('allisoneclay@yahoo.com')
    //  cy.get('[placeholder="Password"]').type('A4yQyW7Ed32ig9z@')
    //  cy.intercept('/v1/auth*').as('login')
    //  cy.get('[data-test-id="login-form-submit-button"]').click()
    //  cy.wait('@login')


    //----How do get 'creds' variable to work? Unrecognized?----
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

});
