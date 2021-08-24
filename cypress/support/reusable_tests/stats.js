Cypress.Commands.add('testStatsPageElements',(viewport,creds)=>{
    cy.viewport(viewport);
    cy.login(creds.email,creds.password);

    cy.getElementByTestId('header-stats-link').click();
    cy.getElementByTestId('stats-title').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain("Stats");
    });
    cy.getElementByTestId('stats-section-title-organizations').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Verified Organizations');
    });
    cy.getElementByTestId('table').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.lengthOf(2);
    });


    cy.getElementByTestId('stats-section-title-services').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Verified Services');
    });


})