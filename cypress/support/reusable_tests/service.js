Cypress.Commands.add('testingServicesElements',(viewport,creds,organization)=>{
    cy.viewport(viewport);
    cy.login(creds.email,creds.password);

    //Add Org
    cy.addOrganization(organization);
    //Add Service
    cy.addService(organization);

    cy.getElementByTestId('table-row-action').click();

    //Test header elements
    cy.getElementByTestId('service-title').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain(organization.services[0].name);
    });
    cy.getElementByTestId('service-tab-details').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Service Details');
    });
    cy.getElementByTestId('service-tab-properties').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Properties');
    });
    cy.getElementByTestId('service-tab-tags').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Tags');
    });
    cy.getElementByTestId('service-detail-title').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Service Details');
    });

    //Test Service Details
    cy.getElementByTestId('service-detail-title').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain("Service Details");
    });
    cy.getElementByTestId('service-new-instruction-button').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('type','button');
        expect($element).contain("New Instructions");
    });
    cy.getElementByTestId('service-instruction-title').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain("Access Instructions");
    });
    cy.getElementByTestId('service-new-address-button').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('type','button');
        expect($element).contain("Edit Address");
    });
    cy.getElementByTestId('service-address-title').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain("Address");
    });
    cy.getElementByTestId('service-new-schedule-button').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('type','button');
        expect($element).contain("Edit Schedule");
    });
    cy.getElementByTestId('service-schedule-title').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain("Schedule");
    });
    cy.getElementByTestId('service-new-email-button').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('type','button');
        expect($element).contain("Edit Email");
    });
    cy.getElementByTestId('service-email-title').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain("Email");
    });
    cy.getElementByTestId('service-new-phone-button').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('type','button');
        expect($element).contain("Edit Phone");
    });
    cy.getElementByTestId('service-phone-title').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain("Phone");
    });
    cy.getElementByTestId('service-edit-coverage-button').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('type','button');
        expect($element).contain("Edit Coverage");
    });
    cy.getElementByTestId('service-coverage-title').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain("Phone");
    });
    cy.getElementByTestId('service-new-note-button').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('type','button');
        expect($element).contain("New Notes");
    });
    cy.getElementByTestId('service-note-title').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain("Notes");
    });
});


Cypress.Commands.add('testAddingServicesDetails',(viewport,creds,organization)=>{
    cy.viewport(viewport);
    cy.login(creds.email,creds.password);

    //Add Org
    cy.addOrganization(organization);
    //Add Service
    cy.addService(organization);

    cy.getElementByTestId('table-row-action').click();


    cy.getElementByTestId('service-details-button').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Edit Details');
        cy.wrap($element).click();
    });

});