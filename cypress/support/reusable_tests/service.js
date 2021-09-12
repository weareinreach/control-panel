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
        expect($element).contain("Service Area Coverage");
    });
    cy.getElementByTestId('service-new-note-button').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('type','button');
        expect($element).contain("New Note");
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

    cy.getElementByTestId('name').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()[0]).contain('Name');
        cy.wrap($element.children()[1]).type(organization.services[0].name);
    });
    cy.getElementByTestId('name_ES').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()[0]).contain('Name_ES');
        cy.wrap($element.children()[1]).type(organization.services[0].name_ES);
    });
    cy.getElementByTestId('slug').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()[0]).contain('Slug');
        cy.wrap($element.children()[1]).type(organization.services[0].slug);
    });
    cy.getElementByTestId('slug_ES').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()[0]).contain('Slug_ES');
        cy.wrap($element.children()[1]).type(organization.services[0].slug_ES);
    });
    cy.getElementByTestId('description').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()[0]).contain('Description');
        cy.wrap($element.children()[1]).type(organization.services[0].description);
    });
    cy.getElementByTestId('description_ES').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()[0]).contain('Description_ES');
        cy.wrap($element.children()[1]).type(organization.services[0].description_ES);
    });
     //save
     cy.getElementByTestId('modal-save-button').click();
});

Cypress.Commands.add('testAddingOrganizationAccessInformation',(viewport,creds,organization)=>{
    cy.viewport(viewport);
    cy.login(creds.email,creds.password);

    //Add Org
    cy.addOrganization(organization);
    //Add Service
    cy.addService(organization);

    cy.getElementByTestId('table-row-action').click();

    cy.getElementByTestId('service-new-instruction-button').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('New Instructions');
        cy.wrap($element).click();
    });

    cy.getElementByTestId('access_type').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()[0]).contain('Type');
        cy.wrap($element.children()[1]).then($childElement=>{
            cy.wrap($childElement.children()[0]).select(organization.services[0].access_instructions[0].access_type);
        });
    });
    cy.getElementByTestId('access_value').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()[0]).contain('Value');
        cy.wrap($element.children()[1]).type(organization.services[0].access_instructions[0].access_value);
    });
    cy.getElementByTestId('access_value_ES').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()[0]).contain('Value_ES');
        cy.wrap($element.children()[1]).type(organization.services[0].access_instructions[0].access_value_ES);
    });
    cy.getElementByTestId('instructions').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()[0]).contain('Instructions');
        cy.wrap($element.children()[1]).type(organization.services[0].access_instructions[0].instructions);
    });
    cy.getElementByTestId('instructions_ES').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()[0]).contain('Instructions_ES');
        cy.wrap($element.children()[1]).type(organization.services[0].access_instructions[0].instructions_ES);
    });
    //save
    cy.getElementByTestId('modal-save-button').click();
});

Cypress.Commands.add('testAddingOrganizationAddress',(viewport,creds,organization)=>{
    cy.viewport(viewport);
    cy.login(creds.email,creds.password);

    //Add Org
    cy.addOrganization(organization);
    //Add Service
    cy.addService(organization);

    cy.getElementByTestId('table-row-action').click();

    cy.getElementByTestId('service-new-address-button').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Edit Address');
        cy.wrap($element).click();
    });

    
})