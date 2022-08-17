Cypress.Commands.add('testingServicesPropertiesTabElements', (viewport, creds, organization) => {
    cy.viewport(viewport);
    cy.login(creds.email, creds.password);

    //Add Org
    cy.addOrganization(organization);
    //Add Service
    cy.addService(organization);

    cy.getElementByTestId('table-row-text-0-name').click();

    //Go to the Properites Tab
    cy.getElementByTestId('service-tab-properties').then($element => {
        expect($element).to.be.visible;
        expect($element).contain('Properties');
        $element.click();
    });
    //look for the help text
    cy.getElementByTestId('service-properties-help-text-container').then($element => {
        expect($element).to.be.visible;
        expect($element).contain("Before adding a community property to a service, ask yourself:");
    })
    //look for the Cost Properties container
    cy.getElementByTestId('service-cost-properties-title').then($element => {
        expect($element).to.be.visible;
        expect($element).contain("Cost Properties");
    })
    //based on the fixture data - make sure the correct properties appear in this section

    //look for the Community Properties container
    cy.getElementByTestId('service-community-title').then($element => {
        expect($element).to.be.visible;
        expect($element).contain("Community Properties");
    })
    //based on the fixture data - make sure the correct properties appear in this section

    //look for the Eligibility / Requirement Properties container
    cy.getElementByTestId('service-requirements-title').then($element => {
        expect($element).to.be.visible;
        expect($element).contain("Eligibility / Requirement Properties");
    })
    //based on the fixture data - make sure the correct properties appear in this section

    //look for the Language Properties Properties container
    cy.getElementByTestId('service-language-title').then($element => {
        expect($element).to.be.visible;
        expect($element).contain("Language Properties");
    })
    //based on the fixture data - make sure the correct properties appear in this section

    //look for the Additional Information Properties container
    cy.getElementByTestId('service-additional-title').then($element => {
        expect($element).to.be.visible;
        expect($element).contain("Additional Information Properties");
    })
    //based on the fixture data - make sure the correct properties appear in this section   
});