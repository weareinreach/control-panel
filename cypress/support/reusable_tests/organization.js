Cypress.Commands.add('testOrganizationDetailsElements',(viewport,creds)=>{
    cy.viewport(viewport);
    cy.login(creds.email,creds.password);

    cy.getElementByTestId('table-row').then($element=>{
        cy.wrap($element[0]).click();
    });

});