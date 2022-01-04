Cypress.Commands.add('testingOrganizationServicesElements',(viewport,creds,organization)=>{
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


Cypress.Commands.add('testAddingOrganizationServicesDetails',(viewport,creds,organization)=>{
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

Cypress.Commands.add('testAddingOrganizationServiceAccessInformation',(viewport,creds,organization)=>{
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

Cypress.Commands.add('testAddingOrganizationServiceAddress',(viewport,creds,organization)=>{
    cy.viewport(viewport);
    cy.login(creds.email,creds.password);

    //Add Org
    cy.addOrganization(organization);
    //Add Service
    cy.addService(organization);
   //cy.intercept('/v1/organizations/**');
    cy.wait(3000);
    //Add Address
    cy.addAddress(organization);
   // cy.intercept('/v1/organizations/**');
    cy.wait(3000);
    cy.scrollTo(0, 500)
    cy.getElementByTestId('table-row-action').then($element=>{
        cy.wrap($element[0]).click();
    })

    cy.getElementByTestId('service-new-address-button').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Edit Address');
        cy.wrap($element).click();
    });

    cy.getElementByTestId('modal-header').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Edit Addresses');
    });

    cy.getElementByTestId('location_id').then($element=>{
        cy.wrap($element.children()).then($childElement=>{
            cy.wrap($childElement.children()[0]).select(organization.locations[0].name);
        }); 
        //save
        cy.getElementByTestId('modal-save-button').click();
    });

});

Cypress.Commands.add('testAddingOrganizationServiceSchedule',(viewport,creds,organization)=>{
    cy.viewport(viewport);
    cy.login(creds.email,creds.password);

    //Add Org
    cy.addOrganization(organization);
    //Add Service
    cy.addService(organization);
   //cy.intercept('/v1/organizations/**');
    cy.wait(3000);
    //Add Address
    cy.addSchedule(organization);
   // cy.intercept('/v1/organizations/**');
    cy.wait(3000);
    cy.scrollTo(0, 500)
    cy.getElementByTestId('table-row-action').then($element=>{
        cy.wrap($element[0]).click();
    })

    cy.getElementByTestId('service-new-schedule-button').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Edit Schedule');
        cy.wrap($element).click();
    });

    cy.getElementByTestId('modal-header').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Edit Schedules');
    });

    cy.getElementByTestId('schedule_id').then($element=>{
        cy.wrap($element.children()).then($childElement=>{
            cy.wrap($childElement.children()[0]).select(organization.schedules[0].name);
        }); 
        //save
        cy.getElementByTestId('modal-save-button').click();
    });

});

Cypress.Commands.add('testAddingOrganizationServiceEmails',(viewport,creds,organization)=>{
    cy.viewport(viewport);
    cy.login(creds.email,creds.password);

    //Add Org
    cy.addOrganization(organization);
    //Add Service
    cy.addService(organization);
   //cy.intercept('/v1/organizations/**');
    cy.wait(3000);
    //Add Address
    cy.addEmail(organization);
   // cy.intercept('/v1/organizations/**');
    cy.wait(3000);
    cy.scrollTo(0, 500)
    cy.getElementByTestId('table-row-action').then($element=>{
        cy.wrap($element[0]).click();
    });

    cy.getElementByTestId('service-new-email-button').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Edit Email');
        cy.wrap($element).click();
    });

    cy.getElementByTestId('modal-header').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Edit Emails');
    });

    cy.getElementByTestId('email_id').then($element=>{
        cy.wrap($element.children()).then($childElement=>{
            cy.wrap($childElement.children()[0]).select(organization.emails[0].email);
        }); 
        //save
        cy.getElementByTestId('modal-save-button').click();
    });

});

Cypress.Commands.add('testAddingOrganizationServicePhone',(viewport,creds,organization)=>{
    cy.viewport(viewport);
    cy.login(creds.email,creds.password);

    //Add Org
    cy.addOrganization(organization);
    //Add Service
    cy.addService(organization);
   //cy.intercept('/v1/organizations/**');
    cy.wait(3000);
    //Add Address
    cy.addPhone(organization);
   // cy.intercept('/v1/organizations/**');
    cy.wait(3000);
    cy.scrollTo(0, 500)
    cy.getElementByTestId('table-row-action').then($element=>{
        cy.wrap($element[0]).click();
    });

    cy.getElementByTestId('service-new-phone-button').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Edit Phone');
        cy.wrap($element).click();
    });

    cy.getElementByTestId('modal-header').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Edit Phones');
    });

    cy.getElementByTestId('phone_id').then($element=>{
        cy.wrap($element.children()).then($childElement=>{
            cy.wrap($childElement.children()[0]).select(organization.phones[0].phone_type);
        }); 
        //save
        cy.getElementByTestId('modal-save-button').click();
    });

});

Cypress.Commands.add('testAddingOrganizationServiceEditCoverage',(viewport,creds,organization)=>{
    cy.viewport(viewport);
    cy.login(creds.email,creds.password);

    //Add Org
    cy.addOrganization(organization);
    //Add Service
    cy.addService(organization);

    cy.getElementByTestId('table-row-action').click();

    cy.getElementByTestId('service-edit-coverage-button').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Edit Coverage');
        cy.wrap($element).click();
    });

    cy.getElementByTestId('modal-header').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Edit Coverage');
    });
    cy.getElementByTestId('coverage-form-header').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Coverage Areas');
    });
    cy.getElementByTestId('coverage-form-area').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('New Coverage Area');
    });

    cy.getElementByTestId('coverage-form-label').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Country');
    });

    cy.getElementByTestId('coverage-form-select-country').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Select a country');
        cy.wrap($element).type('United States{enter}');
    });

    cy.getElementByTestId('coverage-form-label').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.lengthOf(3);
        expect($element[1]).contain('National');
    });

    cy.getElementByTestId('coverage-form-child').then($element=>{
        expect($element).to.be.visible;
        expect($element[1]).contain('check this field only if the org/service is able to help people located anywhere in the country.');
        cy.wrap($element[1]).click();
    });

    cy.getElementByTestId('coverage-form-label').then($element=>{
        expect($element).to.be.visible;
        expect($element[2]).contain('State');
    });

    cy.getElementByTestId('coverage-form-child').then($element=>{
        expect($element).to.be.visible;
        expect($element[2]).contain('Select a State')
        cy.wrap($element[2]).type('Wyoming{enter}');
    });

    cy.getElementByTestId('coverage-form-label').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.lengthOf(6);
        expect($element[3]).contain('City');
    });

    cy.getElementByTestId('coverage-form-child').then($element=>{
        expect($element).to.be.visible;
        expect($element[3]).contain('Select a City')
        cy.wrap($element[3]).type('Casper{enter}');
    });

    cy.getElementByTestId('coverage-form-label').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.lengthOf(6);
        expect($element[4]).contain('County');
    });

    cy.getElementByTestId('coverage-form-child').then($element=>{
        expect($element).to.be.visible;
        expect($element[4]).contain('Select a County')
        cy.wrap($element[4]).type('Natrona{enter}');
    });

     //save
     cy.getElementByTestId('modal-save-button').click();
});

Cypress.Commands.add('testAddingOrganizationServicesNotes',(viewport,creds,organization)=>{
    cy.viewport(viewport);
    cy.login(creds.email,creds.password);

    //Add Org
    cy.addOrganization(organization);

    //Add Notes
    cy.getElementByTestId('organization-new-note-button').click();
    cy.getElementByTestId('modal-header').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('New Note');
    });

    cy.getElementByTestId('note').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Note');
        cy.wrap($element).type(organization.notes)
    });

    //save
    cy.getElementByTestId('modal-save-button').click();

})