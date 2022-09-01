Cypress.Commands.add('testOrganizationDetailsGeneralElements',(viewport,creds)=>{
    cy.viewport(viewport);
    cy.login(creds.email,creds.password);

    cy.getElementByTestId('organization-title').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Organizations');
    });

    cy.getElementByTestId('organization-new-button').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('type','button');
        expect($element).contain('New Organization');
    })

    cy.getElementByTestId('table-row-text-0-name').then($element=>{
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

    cy.getElementByTestId('table-row-text-0-name').then($element=>{
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

    //Add Org
    cy.addOrganization(organization);

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

    //Add Org
    cy.addOrganization(organization);

    // Register intercepts
    cy.intercept({method:'GET', url:'/v1/organizations/*'}).as('loadOrg');
    cy.intercept({method:'PATCH', url:'/v1/organizations/*'}).as('saveAddress');

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
        cy.wrap($element.children()[1]).type(organization.locations[0].lat);
    });
    cy.getElementByTestId('long').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()[0]).contain('Long');
        cy.wrap($element.children()[1]).type(organization.locations[0].long);
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
    cy.wait('@saveAddress');
    cy.wait('@loadOrg');
    // Assert address has been added
    cy.getElementByTestId('table-row-text-0-name').contains(organization.locations[0].name).should('be.visible')
});


Cypress.Commands.add('testAddingOrganizationSchedules',(viewport,creds,organization)=>{
    cy.viewport(viewport);
    cy.login(creds.email,creds.password);

    //Add Org
    cy.addOrganization(organization);

     // Register intercepts
    cy.intercept({method:'GET', url:'/v1/organizations/*'}).as('loadOrg');
    cy.intercept({method:'PATCH', url:'/v1/organizations/*'}).as('saveSchedule');

    //Add Week Schedule
    cy.getElementByTestId('organization-new-schedule-button').click();
    cy.getElementByTestId('modal-header').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('New Schedule');
    });
    cy.getElementByTestId('name').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()[0]).contain('Name');
        cy.wrap($element.children()[1]).type(organization.schedules[0].name);
    });
    cy.getElementByTestId('monday_start').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()[0]).contain('Monday Start');
        cy.wrap($element.children()[1]).type(organization.schedules[0].monday_start);
    });
    cy.getElementByTestId('monday_end').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()[0]).contain('Monday End');
        cy.wrap($element.children()[1]).type(organization.schedules[0].monday_end);
    });
    cy.getElementByTestId('tuesday_start').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()[0]).contain('Tuesday Start');
        cy.wrap($element.children()[1]).type(organization.schedules[0].tuesday_start);
    });
    cy.getElementByTestId('tuesday_end').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()[0]).contain('Tuesday End');
        cy.wrap($element.children()[1]).type(organization.schedules[0].tuesday_end);
    });
    cy.getElementByTestId('wednesday_start').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()[0]).contain('Wednesday Start');
        cy.wrap($element.children()[1]).type(organization.schedules[0].wednesday_start);
    });
    cy.getElementByTestId('wednesday_end').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()[0]).contain('Wednesday End');
        cy.wrap($element.children()[1]).type(organization.schedules[0].wednesday_end);
    });
    cy.getElementByTestId('thursday_start').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()[0]).contain('Thursday Start');
        cy.wrap($element.children()[1]).type(organization.schedules[0].thursday_start);
    });
    cy.getElementByTestId('thursday_end').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()[0]).contain('Thursday End');
        cy.wrap($element.children()[1]).type(organization.schedules[0].thursday_end);
    });
    cy.getElementByTestId('friday_start').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()[0]).contain('Friday Start');
        cy.wrap($element.children()[1]).type(organization.schedules[0].friday_start);
    });
    cy.getElementByTestId('friday_end').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()[0]).contain('Friday End');
        cy.wrap($element.children()[1]).type(organization.schedules[0].friday_end);
    });

    cy.getElementByTestId('timezone').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()[0]).contain('Timezone');
        cy.wrap($element.children().children()[0]).select(organization.schedules[0].timezone);
    });

    cy.getElementByTestId('note').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()[0]).contain('Note');
        cy.wrap($element.children()[1]).type(organization.schedules[0].note);
    });
    //save
    cy.getElementByTestId('modal-save-button').click();

    cy.wait('@saveSchedule');
    cy.wait('@loadOrg');

    // Add Weekend Schedule
    cy.getElementByTestId('organization-new-schedule-button').click();
    cy.getElementByTestId('name').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()[0]).contain('Name');
        cy.wrap($element.children()[1]).type(organization.schedules[1].name);
    });

    cy.getElementByTestId('saturday_start').scrollIntoView().then($element=>{
        expect($element).to.be.visible;
        expect($element.children()[0]).contain('Saturday Start');
        cy.wrap($element.children()[1]).type(organization.schedules[1].saturday_start);
    });
    cy.getElementByTestId('saturday_end').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()[0]).contain('Saturday End');
        cy.wrap($element.children()[1]).type(organization.schedules[1].saturday_end);
    });
    cy.getElementByTestId('sunday_start').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()[0]).contain('Sunday Start');
        cy.wrap($element.children()[1]).type(organization.schedules[1].sunday_start);
    });
    cy.getElementByTestId('sunday_end').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()[0]).contain('Sunday End');
        cy.wrap($element.children()[1]).type(organization.schedules[1].sunday_end);
    });

    cy.getElementByTestId('timezone').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()[0]).contain('Timezone');
        cy.wrap($element.children().children()[0]).select(organization.schedules[1].timezone);
    });

    cy.getElementByTestId('note').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()[0]).contain('Note');
        cy.wrap($element.children()[1]).type(organization.schedules[1].note);
    });
    //save
    cy.getElementByTestId('modal-save-button').click();

});


Cypress.Commands.add('testAddingOrganizationEmail',(viewport,creds,organization)=>{
    cy.viewport(viewport);
    cy.login(creds.email,creds.password);

    //Add Org
    cy.addOrganization(organization);

    //Add Email
    cy.getElementByTestId('organization-new-email-button').click();
    cy.getElementByTestId('modal-header').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('New Emails');
    });
    cy.getElementByTestId('email').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()[0]).contain('Email');
        cy.wrap($element.children()[1]).type(organization.emails[0].email);
    });
    cy.getElementByTestId('title').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()[0]).contain('Title');
        cy.wrap($element.children()[1]).type(organization.emails[0].title);
    });
    cy.getElementByTestId('title_ES').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()[0]).contain('Title_ES');
        cy.wrap($element.children()[1]).type(organization.emails[0].email);
    });
    cy.getElementByTestId('first_name').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()[0]).contain('First Name');
        cy.wrap($element.children()[1]).type(organization.emails[0].first_name);
    });
    cy.getElementByTestId('last_name').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()[0]).contain('Last Name');
        cy.wrap($element.children()[1]).type(organization.emails[0].last_name);
    });
    cy.getElementByTestId('is_primary').then($element=>{
        expect($element).to.be.visible;
        cy.wrap($element.children()[0]).click();
    });
    //Save
    cy.getElementByTestId('modal-save-button').click();

});

Cypress.Commands.add('testAddingOrganizationPhone',(viewport,creds,organization)=>{
    cy.viewport(viewport);
    cy.login(creds.email,creds.password);

    //Add Org
    cy.addOrganization(organization);

    //Add Phone
    cy.getElementByTestId('organization-new-phone-button').click();
    cy.getElementByTestId('modal-header').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('New Phone');
    });
    cy.getElementByTestId('phone_type').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()[0]).contain('Phone Type');
        cy.wrap($element.children()[1]).type(organization.phones[0].phone_type);
    });
    cy.getElementByTestId('phone_type_ES').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()[0]).contain('Phone Type_ES');
        cy.wrap($element.children()[1]).type(organization.phones[0].phone_type_ES);
    });
    cy.getElementByTestId('digits').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()[0]).contain('Digits');
        cy.wrap($element.children()[1]).type(organization.phones[0].digits);
    });
    cy.getElementByTestId('is_primary').then($element=>{
        expect($element).to.be.visible;
        cy.wrap($element.children()[0]).click();
    });
    //Save
    cy.getElementByTestId('modal-save-button').click();
});

Cypress.Commands.add('testAddingOrganizationSocialMedia',(viewport,creds,organization)=>{
    cy.viewport(viewport);
    cy.login(creds.email,creds.password);

    //Add Org
    cy.addOrganization(organization);

    //Add Social Media
    cy.getElementByTestId('organization-new-social-media-button').click();
    cy.getElementByTestId('modal-header').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('New Social Media Profile');
    });
    cy.getElementByTestId('name').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Platform');
        cy.wrap($element.children()[1]).then($childElement=>{
            cy.wrap($childElement.children()[0]).select(organization.social_media[0].name);
        });
    });
    cy.getElementByTestId('url').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()[0]).contain('Url');
        cy.wrap($element.children()[1]).type(organization.social_media[0].url);
    });
    //save
    cy.getElementByTestId('modal-save-button').click();

});

Cypress.Commands.add('testAddingOrganizationEditCoverage',(viewport,creds,organization)=>{
    cy.viewport(viewport);
    cy.login(creds.email,creds.password);

    //Add Org
    cy.addOrganization(organization);

    //Edit Coverage
    cy.getElementByTestId('organization-edit-coverage-button').click();
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

Cypress.Commands.add('testAddingOrganizationNotes',(viewport,creds,organization)=>{
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

Cypress.Commands.add('testOrganizationSocialMediaDisabled',(viewport,creds,organization)=>{
    cy.viewport(viewport);
    cy.login(creds.email,creds.password);

    //Add Org
    cy.addOrganization(organization);
        //Add Social Media
    cy.getElementByTestId('organization-new-social-media-button').click();
    cy.getElementByTestId('modal-header').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('New Social Media Profile');
    });
    cy.getElementByTestId('name').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Platform');
        cy.wrap($element.children()[1]).then($childElement=>{
            cy.wrap($childElement.children()[0]).select(organization.social_media[0].name);
        });
    });
    cy.getElementByTestId('url').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()[0]).contain('Url');
        cy.wrap($element.children()[1]).type(organization.social_media[0].url);
    });
    //save
    cy.getElementByTestId('modal-save-button').click();
    cy.reload()
        //Add Social Media
    cy.getElementByTestId('organization-new-social-media-button').click();
    cy.getElementByTestId('modal-header').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('New Social Media Profile');
    });
    cy.getElementByTestId('name').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Platform');
        cy.wrap($element.children()[1]).then($childElement=>{
            cy.wrap($childElement.children()[0]).select(organization.social_media[1].name);
        });
    });
    cy.getElementByTestId('url').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()[0]).contain('Url');
        cy.wrap($element.children()[1]).type(organization.social_media[1].url);
    });
    //save
    cy.getElementByTestId('modal-save-button').click();
    cy.reload()
        //Add Social Media
    cy.getElementByTestId('organization-new-social-media-button').click();
    cy.getElementByTestId('modal-header').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('New Social Media Profile');
    });
    cy.getElementByTestId('name').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Platform');
        cy.wrap($element.children()[1]).then($childElement=>{
            cy.wrap($childElement.children()[0]).select(organization.social_media[2].name);
        });
    });
    cy.getElementByTestId('url').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()[0]).contain('Url');
        cy.wrap($element.children()[1]).type(organization.social_media[2].url);
    });
    //save
    cy.getElementByTestId('modal-save-button').click();
    cy.reload()
        //Add Social Media
    cy.getElementByTestId('organization-new-social-media-button').click();
    cy.getElementByTestId('modal-header').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('New Social Media Profile');
    });
    cy.getElementByTestId('name').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Platform');
        cy.wrap($element.children()[1]).then($childElement=>{
            cy.wrap($childElement.children()[0]).select(organization.social_media[3].name);
        });
    });
    cy.getElementByTestId('url').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()[0]).contain('Url');
        cy.wrap($element.children()[1]).type(organization.social_media[3].url);
    });
    //save
    cy.getElementByTestId('modal-save-button').click();
    cy.reload()

    //Try to Add Social Media
    cy.getElementByTestId('organization-new-social-media-button').should('be.disabled');

});