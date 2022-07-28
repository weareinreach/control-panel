Cypress.Commands.add('testingServicesTagsTabElements', (viewport, creds, organization) => {
    cy.viewport(viewport);
    cy.login(creds.email, creds.password);

    //Add Org
    cy.addOrganization(organization);
    //Add Service
    cy.addService(organization);

    cy.getElementByTestId('table-row-text-0-name').click();

    //Go to the Tabs Tab
    cy.getElementByTestId('service-tab-tags').click();

    //look for the help text
    cy.getElementByTestId('service-tags-help-text-container').then($element => {
        expect($element).to.be.visible;
        expect($element.children()).contain(" when this organization appears in the search results of our free App.");
    });

    //look for the United States Tags container
    cy.getElementByTestId('service-tags-us-container').then($element => {
        expect($element).to.be.visible;
    });
    cy.getElementByTestId('service-us-title').then($element => {
        expect($element).to.be.visible;
        expect($element).contain('United States');
    });
    cy.getElementByTestId('service-us-tags-button').then($element => {
        expect($element).to.be.visible;
        expect($element).to.have.attr('type', 'button');
        expect($element).contain("Edit Tags");
    });

    //based on the fixture data (should have US data for a service)- make sure the correct tags appear

    //look for the Canada Tags container
    cy.getElementByTestId('service-tags-canada-container').then($element => {
        expect($element).to.be.visible;
    });
    //based on the fixture data (should have Canada data for a service)- make sure the correct tags appear

    //look for the Mexico Tags container
    cy.getElementByTestId('service-tags-mexico-container').then($element => {
        expect($element).to.be.visible;
    });
    //based on the fixture data (should have Mexico data for a service)- make sure the correct tags appear
});