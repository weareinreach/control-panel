Cypress.Commands.add('testDashboardElements',(viewport, creds)=>{
    cy.viewport(viewport);
    cy.login(creds.email,creds.password);

    //Box 1
    cy.getElementByTestId('box').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.length(2);
    });
    cy.getElementByTestId('title').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Organizations');
    });
    cy.getElementByTestId('table').then($element=>{
        expect($element).to.be.visible;
    });
    cy.getElementByTestId('table-header-text').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.length(2);
        expect($element[0]).contain('Name');
        expect($element[1]).contain('Last Updated');
    });
    cy.getElementByTestId('table-row').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.length(20);
    });

    //Box 2
    cy.getElementByTestId('section-title').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Filter Organizations');
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
        expect($element).contain('Service Area Coverage:');
    });

    cy.getElementByTestId('filter-service-area-input').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('placeholder','Search on a service area');
    });

    cy.getElementByTestId('filter-last-verified-label').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Last Verified:');
    });

    cy.getElementByTestId('filter-use-date-range-label').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Use Date Range');
    })

    
});