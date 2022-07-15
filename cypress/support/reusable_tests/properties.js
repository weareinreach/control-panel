Cypress.Commands.add('testingServicesPropertiesTabElements',(viewport,creds,organization)=>{
    cy.viewport(viewport);
    cy.login(creds.email,creds.password);

    //Add Org
    cy.addOrganization(organization);
    //Add Service
    cy.addService(organization);

    cy.getElementByTestId('table-row-text-0-name').click();

    //Go to the Properites Tab
    cy.getElementByTestId('service-tab-properties').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Properties');
    });
    //look for the help text

    //look for the Cost Properties container

    //based on the fixture data - make sure the correct properties appear in this section

    //look for the Community Properties container

    //based on the fixture data - make sure the correct properties appear in this section

    //look for the Eligibility / Requirement Properties container

    //based on the fixture data - make sure the correct properties appear in this section

    //look for the Language Properties Properties container

    //based on the fixture data - make sure the correct properties appear in this section

    //look for the Additional Information Properties container

    //based on the fixture data - make sure the correct properties appear in this section   
});