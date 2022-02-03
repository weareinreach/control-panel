
Cypress.Commands.add('testAdminFilterAddNewManagerAction', (viewport, creds, admin) => {
    cy.viewport(viewport);
    cy.login(creds.email, creds.password);

    //Waiting for Response
    cy.intercept('/v1/organizations/**');

    cy.getElementByTestId('header-admin-link').click();
    cy.getElementByTestId('admin-users-new-manager').click();

    cy.getElementByTestId('name').type(admin.name);
    cy.getElementByTestId('email').type(admin.email);
    cy.getElementByTestId('isAdminDataManager').then($element => {
        cy.wrap($element.children()).click();
    });

    cy.getElementByTestId('modal-save-button').click();
    //Reload Page
    cy.reload();
    cy.getElementByTestId('table-row-action-0-delete').then($element => {
        cy.wrap($element[0]).click();
        cy.getElementByTestId('modal-save-button').click();
    });
});

