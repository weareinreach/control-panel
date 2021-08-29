Cypress.Commands.add('testStatsPageElements',(viewport,creds)=>{
    cy.viewport(viewport);
    cy.login(creds.email,creds.password);
    cy.wait(1000);

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

    cy.getElementByTestId('table-header-text').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.lengthOf(4);
        expect($element[0]).contain("Country");
        expect($element[1]).contain("Count");
    });

    cy.getElementByTestId('table-row-text').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.length.greaterThan(2);
    });

    cy.getElementByTestId('stats-section-title-services').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Verified Services');
    });


});