Cypress.Commands.add('testOrganizationDetailsGeneralElements',(viewport,creds)=>{
    cy.viewport(viewport);
    cy.login(creds.email,creds.password);

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