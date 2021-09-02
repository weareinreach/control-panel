Cypress.Commands.add('testOrganizationDetailsGeneralElements',(viewport,creds)=>{
    cy.viewport(viewport);
    cy.login(creds.email,creds.password);
    cy.wait(1000);

    cy.getElementByTestId('organization-title').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Organizations');
    });

    cy.getElementByTestId('organization-new-button').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('type','button');
        expect($element).contain('New Organization');
    })

    cy.getElementByTestId('table-row').then($element=>{
        cy.wrap($element[0]).click();
    });

    cy.getElementByTestId('title').then($element=>{
        expect($element).to.be.visible;
        expect($element.text().length).to.be.greaterThan(3);
    });

    cy.getElementByTestId('bread-crumbs-link').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('href','/');
    });

    cy.getElementByTestId('bread-crumbs-title').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.contain('Organizations');
    });

    cy.getElementByTestId('bread-crumbs-organization-name').then($element=>{
        expect($element).to.be.visible;
        expect($element.text().length).to.be.greaterThan(3);
    });

    cy.getElementByTestId('drop-down-button-container').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.lengthOf(4);
        expect($element).to.have.attr('type','button');
    });

    cy.getElementByTestId('organization-tabs').then($element=>{
        expect($element).to.be.visible;
    });

    cy.getElementByTestId('organization-tab-general').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('type','button');
        expect($element).to.have.attr('role','tab');
        expect($element).contain('General');
    });

    cy.getElementByTestId('organization-tab-photos').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('type','button');
        expect($element).to.have.attr('role','tab');
        expect($element).contain('Photos');
    });

    cy.getElementByTestId('organization-edit-button').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Edit Details');
    });

    cy.getElementByTestId('organization-details-title').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('General Details');
    });

    cy.getElementByTestId('organization-affiliates-title').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Associated Affiliates');
    });

    cy.getElementByTestId('organization-services-title').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Services');
    });
    
    cy.getElementByTestId('organization-new-address-button').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('New Address');
    });

    cy.getElementByTestId('organization-addresses-title').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Addresses');
    });

    cy.getElementByTestId('organization-new-schedule-button').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('New Schedule');
    });

    cy.getElementByTestId('organization-schedules-title').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Schedules');
    });

    cy.getElementByTestId('organization-new-email-button').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('New Email');
    });

    cy.getElementByTestId('organization-emails-title').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Emails');
    });

    cy.getElementByTestId('organization-new-phone-button').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('New Phone');
    });

    cy.getElementByTestId('organization-phones-title').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Phones');
    });

    cy.getElementByTestId('organization-new-social-media-button').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('New Social Media Profile');
    });

    cy.getElementByTestId('organization-social-media-title').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Social Media');
    });

    cy.getElementByTestId('organization-edit-coverage-button').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Edit Coverage');
    });

    cy.getElementByTestId('organization-service-area-coverage-title').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Service Area Coverage');
    });

    cy.getElementByTestId('organization-new-note-button').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('New Note');
    });

    cy.getElementByTestId('organization-notes-title').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Notes');
    });
});

Cypress.Commands.add('testOrganizationDetailsPhotosElements',(viewport,creds)=>{
    cy.viewport(viewport);
    cy.login(creds.email,creds.password);
    cy.wait(1000);

    cy.getElementByTestId('table-row').then($element=>{
        cy.wrap($element[0]).click();
    });

    cy.getElementByTestId('organization-tab-photos').click();
    
    cy.getElementByTestId('photos-form-title').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Photos');
    });

    cy.getElementByTestId('photos-form-approved-button').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('type','button');
        expect($element).contain('Approved');
        cy.wrap($element).click();
    });

    cy.getElementByTestId('photos-form-no-approved-photos-text').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('There are no approved photos for this organization.');
    });

    cy.getElementByTestId('photos-form-all-button').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('type','button');
        expect($element).contain('All');
        cy.wrap($element).click();
    });

    cy.getElementByTestId('photos-form-all-button').click().then(()=>{
        cy.getElementByTestId('photos-form-no-four-square-photos-text').then($element=>{
            expect($element).to.be.visible;
            expect($element).contain("We weren't able to find any FourSquare photos for this venue.")
        });
    });

    cy.getElementByTestId('photos-form-select-photos').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('type','button');
        expect($element).contain('Select Photos');
        cy.wrap($element).click();
    });

    cy.getElementByTestId('photos-form-cancel-button').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('type','button');
        expect($element).contain('Cancel');
    });

});


Cypress.Commands.add('testAddingOrganizationAction',(viewport,creds,organization)=>{
    cy.viewport(viewport);
    cy.login(creds.email,creds.password);
    cy.wait(1000);

    cy.getElementByTestId('organization-new-button').click();
    cy.getElementByTestId('name').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()[0]).contain('Organization Name');
        //Type name
        expect($element.children()[1]).to.have.attr('name','name');
        cy.wrap($element.children()[1]).type(organization.name);
        //Save
        cy.getElementByTestId('modal-save-button').click();
    });
    //Edit Organization
    cy.getElementByTestId('organization-edit-button').click();
    
    cy.getElementByTestId('name').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()[0]).contain('Name');
        expect($element.children()[1]).to.have.attr('value',organization.name);
    });

    cy.getElementByTestId('name_ES').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()[0]).contain('Name_ES');
        cy.wrap($element.children()[1]).type(organization.name_es)
    });

    cy.getElementByTestId('slug').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()[0]).contain('Slug');
        expect($element.children()[2]).to.have.attr('value',organization.slug);
    });

    cy.getElementByTestId('slug_ES').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()[0]).contain('Slug_ES');
        cy.wrap($element.children()[2]).type(organization.slug_es);
    });

    cy.getElementByTestId('website').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()[0]).contain('Website');
        cy.wrap($element.children()[1]).type(organization.website);
    });

    cy.getElementByTestId('website_ES').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()[0]).contain('Website_ES');
        cy.wrap($element.children()[1]).type(organization.website_es);
    });

    cy.getElementByTestId('description').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()[0]).contain('Description');
        cy.wrap($element.children()[1]).type(organization.description);
    });

    cy.getElementByTestId('description_ES').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()[0]).contain('Description_ES');
        cy.wrap($element.children()[1]).type(organization.description_es);
    });

    cy.getElementByTestId('alert_message').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()[0]).contain('Alert Message');
        cy.wrap($element.children()[1]).type(organization.alert_message);
    });

    cy.getElementByTestId('alert_message_ES').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()[0]).contain('Alert Message_ES');
        cy.wrap($element.children()[1]).type(organization.alert_message_es)
    });

    cy.getElementByTestId('is_published').then($element=>{
        expect($element).to.be.visible;
    });

    //Save Org
    cy.getElementByTestId('modal-save-button').click();
    //Check Modal
    cy.getElementByTestId('modal-header').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Verify Information for '+organization.name+'?')
    });

    cy.getElementByTestId('modal-save-and-verify-button').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Save and Verify');
    });
    //save
    cy.getElementByTestId('modal-save-button').click();

});

Cypress.Commands.add('testAddingOrganizationServices',(viewport,creds,organization)=>{
    cy.viewport(viewport);
    cy.login(creds.email,creds.password);
    cy.wait(1000);

    cy.getElementByTestId('organization-new-button').click();
    //Add Org
    cy.getElementByTestId('name').then($element=>{
        cy.wrap($element.children()[1]).type(organization.name);
        cy.getElementByTestId('modal-save-button').click();
    });

    //Add Service
    cy.getElementByTestId('organization-new-service-button').click();
    cy.getElementByTestId('modal-header').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('New Service Name')
    });
    cy.getElementByTestId('name').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()[0]).contain('Service Name');
        cy.wrap($element.children()[1]).type(organization.services[0].name);
        //Save
        cy.getElementByTestId('modal-save-button').click();
    })
});



Cypress.Commands.add('testAddingOrganizationAddresses',(viewport,creds,organization)=>{
    cy.viewport(viewport);
    cy.login(creds.email,creds.password);
    cy.wait(1000);

    cy.getElementByTestId('organization-new-button').click();
    //Add Org
    cy.getElementByTestId('name').then($element=>{
        cy.wrap($element.children()[1]).type(organization.name);
        cy.getElementByTestId('modal-save-button').click();
    });
    //Add Address
    cy.getElementByTestId('organization-new-address-button').click();
    cy.getElementByTestId('modal-header').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('New Location')
    })
    cy.getElementByTestId('name').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()[0]).contain('Name');
        cy.wrap($element.children()[1]).type(organization.locations[0].name);
    });
    cy.getElementByTestId('name_ES').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()[0]).contain('Name_ES');
        cy.wrap($element.children()[1]).type(organization.locations[0].name_ES);
    });
    cy.getElementByTestId('unit').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()[0]).contain('Unit');
        cy.wrap($element.children()[1]).type(organization.locations[0].unit);
    });
    cy.getElementByTestId('address').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()[0]).contain('Address');
        cy.wrap($element.children()[1]).type(organization.locations[0].address);
    });
    cy.getElementByTestId('city').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()[0]).contain('City');
        cy.wrap($element.children()[1]).type(organization.locations[0].city);
    });
    cy.getElementByTestId('state').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()[0]).contain('State');
        cy.wrap($element.children()[1]).type(organization.locations[0].state);
    });

    cy.getElementByTestId('country').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()[0]).contain('Country');
        cy.wrap($element.children()[1]).type(organization.locations[0].country);
    });
    cy.getElementByTestId('city_ES').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()[0]).contain('City_ES');
        cy.wrap($element.children()[1]).type(organization.locations[0].city_ES);
    });
    cy.getElementByTestId('state_ES').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()[0]).contain('State_ES');
        cy.wrap($element.children()[1]).type(organization.locations[0].state_ES);
    });
    cy.getElementByTestId('country_ES').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()[0]).contain('Country_ES');
        cy.wrap($element.children()[1]).type(organization.locations[0].country_ES);
    });
    cy.getElementByTestId('zip_code').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()[0]).contain('Zipcode');
        cy.wrap($element.children()[1]).type(organization.locations[0].zip_code);
    });
    cy.getElementByTestId('lat').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()[0]).contain('Lat');
        cy.wrap($element.children()[1]).type(organization.locations[0].geolocation.coordinates[0]);
    });
    cy.getElementByTestId('long').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()[0]).contain('Long');
        cy.wrap($element.children()[1]).type(organization.locations[0].geolocation.coordinates[1]);
    });
    cy.getElementByTestId('is_primary').then($element=>{
        expect($element).to.be.visible;
        cy.wrap($element.children()[0]).click();
    });
    cy.getElementByTestId('show_on_organization').then($element=>{
        expect($element).to.be.visible;
    });
    //Save
    cy.getElementByTestId('modal-save-button').click();
});