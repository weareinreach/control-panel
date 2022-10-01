Cypress.Commands.add('testDashboardElements',(viewport, creds)=>{
    cy.viewport(viewport);
    cy.login(creds.email,creds.password);

    //Box 1
    cy.getElementByTestId('box').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.length(2);
    });
    cy.getElementByTestId('organization-title').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Organizations');
    });
    cy.getElementByTestId('dashboard-table').then($element=>{
        expect($element).to.be.visible;
    });
    cy.getElementByTestId('table-header-text-name').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Name');
    });
    cy.getElementByTestId('table-header-text-updated_at').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Last Updated');
    });
    cy.getElementByTestId('table-row-0').then($element=>{
        expect($element).to.be.visible;
    });

    //Box 2
    cy.getElementByTestId('section-title').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Filter Organizations');
    });
    
    cy.getElementByTestId('filter-org-input').then($element=>{
        expect($element).to.be.visible;
    });

    cy.getElementByTestId('filter-organizations-box').then($element=>{
        expect($element).to.be.visible;
    });

    cy.getElementByTestId('filter-name-label').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Name:');
    });

    cy.getElementByTestId('filter-service-area-label').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Service Areas:');
    });

    cy.getElementByTestId('filter-service-area-coverage-button').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('type','button');
        expect($element).contain('Select Service Areas');
    });

    cy.getElementByTestId('filter-last-verified-label').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Last Verified:');
    });

    cy.getElementByTestId('filter-use-date-range-label').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.length(2);
        expect($element).contain('Use Date Range');
    });

    cy.getElementByTestId('filter-last-verified-switch').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()).to.have.attr('type','checkbox');
        expect($element.children()).to.have.attr('id','verified-range');
    });

    cy.getElementByTestId('filter-last-verified-before-label').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Last verified before:');
    });

    cy.getElementByTestId('date-field-picker-last-verified').then($element=>{
        expect($element).to.be.visible;
    });

    cy.getElementByTestId('filter-last-updated-label').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Last Updated:');
    });

    cy.getElementByTestId('filter-last-updated-date-label').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Last updated before:');
    });

    cy.getElementByTestId('date-field-picker-last-updated').then($element=>{
        expect($element).to.be.visible;
    });

    cy.getElementByTestId('filter-created-label').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Created At:');
    });

    cy.getElementByTestId('filter-date-range-label').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Use Date Range');
    });

    cy.getElementByTestId('filter-date-range-switch').then($element=>{
        expect($element).to.be.visible;

    });

    cy.getElementByTestId('date-field-picker-created-before').then($element=>{
        expect($element).to.be.visible;
    });

    cy.getElementByTestId('filter-publish-status-label').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Publish Status:');
    });

    cy.getElementByTestId('filter-publish-status-switch').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('type','checkbox');
        expect($element.children()).contain('Published');
    });

        cy.getElementByTestId('filter-claim-status-switch').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('role','radiogroup');
        expect($element.children()).contain('All');
    });

    cy.getElementByTestId('filter-properties-label').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Properties:');
    });

    cy.getElementByTestId('filter-tags-label').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Tags:');
    });

    cy.getElementByTestId('filter-drop-down-tags-country').then($element=>{
        expect($element).to.be.visible;
    });

    cy.getElementByTestId('filter-drop-down-tags').then($element=>{
        expect($element).to.be.visible;
    });

    cy.getElementByTestId('filter-button-search').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Search');    
    });

    
});


Cypress.Commands.add('testDashboardClickOnOrg',(viewport,creds)=>{
    cy.viewport(viewport);
    cy.login(creds.email,creds.password);

    // cy.getElementByTestId('pagination-next').click();
    // cy.getElementByTestId('pagination-next').click();
    // cy.getElementByTestId('pagination-previous').click();
    cy.getElementByTestId('table-row-text-0-name').then($element=>{
        cy.wrap($element[0]).click();
    });
});

Cypress.Commands.add('testDashboardSearchForOrg',(viewport,creds,org)=>{
    cy.viewport(viewport);
    cy.login(creds.email,creds.password);
    cy.addOrganization(org);

    cy.getElementByTestId('bread-crumbs-title').click();
    cy.wait(2000);

    cy.getElementByTestId('filter-org-input').type(org.name);
    cy.getElementByTestId('filter-button-search').click({force:true});
    cy.wait(1000);
    cy.getElementByTestId('table-row-text-0-name').click();
    
});

