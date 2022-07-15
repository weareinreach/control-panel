Cypress.Commands.add('testingServicesTagsTabElements',(viewport,creds,organization)=>{
    cy.viewport(viewport);
    cy.login(creds.email,creds.password);

    //Add Org
    cy.addOrganization(organization);
    //Add Service
    cy.addService(organization);

    cy.getElementByTestId('table-row-text-0-name').click();

    //Go to the Tabs Tab
    cy.getElementByTestId('service-tab-tags').click();

    //look for the help text
    cy.getElementByTestId('service-tags-help-text-container').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain("What “tag(s)” you choose affect(s) when this organization appears in the search results of our free App. For example, if you add a “LGBTQ Centers” tag to a service page, the organization will appear for a user who searches for “Community Support - LGBTQ Centers” in the App. Please try to consider the user’s perspective when entering tag(s). *Note: Please also make sure to separate an organization's services into unique service pages. This is especially true for legal services. For example, if an organization offers both gender/name change legal services and asylum legal services, these should actually be separate service pages in the data portal (each service page should then have its own distinct, relevant tag). Similarly, if you are using two very different tag types (e.g. transportation and legal), you should likely instead create two different service pages (each with their own distinct tag). Please post in the #community-outreach channel in Slack with any questions.");
    });

    //look for the United States Tags container

    //based on the fixture data (should have US data for a service)- make sure the correct tags appear

    //look for the Canada Tags container

    //based on the fixture data (should have Canada data for a service)- make sure the correct tags appear

    //look for the Mexico Tags container

    //based on the fixture data (should have Mexico data for a service)- make sure the correct tags appear
});