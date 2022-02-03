Cypress.Commands.add('testStatsPageElements',(viewport,creds)=>{
    cy.viewport(viewport);
    cy.login(creds.email,creds.password);

    //Intercept Orgs
    cy.intercept('/v1/reporting/united_states/organizations/count').as('united_states_org');
    cy.intercept('/v1/reporting/mexico/organizations/count').as('mexico_org');
    cy.intercept('/v1/reporting/canada/organizations/count').as('canada_org');
    //Intercept Services
    cy.intercept('/v1/reporting/united_states/services/count').as('united_states_services');
    cy.intercept('/v1/reporting/mexico/services/count').as('mexico_services');
    cy.intercept('/v1/reporting/canada/services/count').as('canada_services');

    cy.getElementByTestId('header-stats-link').click();
    
    //Wait
    cy.wait('@united_states_org');
    cy.wait('@mexico_org');
    cy.wait('@canada_org');
    cy.wait('@united_states_services');
    cy.wait('@mexico_services');
    cy.wait('@canada_services');


    cy.getElementByTestId('stats-title').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain("Stats");
    });
    cy.getElementByTestId('stats-section-title-organizations').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Verified Organizations');
    });
    cy.getElementByTestId('stats-table-organizations').then($element=>{
        expect($element).to.be.visible;
    });

    cy.getElementByTestId('table-header-text-country').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.lengthOf(2);
        expect($element[0]).contain("Country");
    });

    cy.getElementByTestId('table-header-text-count').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.lengthOf(2);
        expect($element[0]).contain("Count");
    });

    cy.getElementByTestId('table-row-text-0-country').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.lengthOf(2);
        expect($element).contain("United States");
    });

    cy.getElementByTestId('table-row-text-1-country').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.lengthOf(2);
        expect($element).contain("Canada");
    });

    cy.getElementByTestId('table-row-text-2-country').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.lengthOf(2);
        expect($element).contain("Mexico");
    });

    cy.getElementByTestId('table-row-text-3-country').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.lengthOf(2);
        expect($element).contain("total");
    });

    cy.getElementByTestId('stats-section-title-services').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Verified Services');
    });
});