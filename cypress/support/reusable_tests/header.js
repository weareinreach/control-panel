Cypress.Commands.add('testHeaderElementsNoLogin',(viewport)=>{
    cy.viewport(viewport);
    cy.getElementByTestId('layout').then($element =>{
        expect($element).to.be.visible;
        expect($element).contain('Login');
    });
});


Cypress.Commands.add('testHeaderElementsLogin',(viewport,creds)=>{
    cy.viewport(viewport);
    cy.login(creds.email,creds.password);
    cy.wait(1000);
    cy.getElementByTestId('layout').then($element =>{
        expect($element).to.be.visible;
    });
    cy.getElementByTestId('header-home-link').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('href','/');
        expect($element).contain('Home');
    });
    cy.getElementByTestId('header-admin-link').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('href','/admin');
        expect($element).contain('Admin');
    });
    cy.getElementByTestId('header-stats-link').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('href','/stats');
        expect($element).contain('Stats');
    });

    cy.getElementByTestId('header-profile-box').then($element=>{
        expect($element).to.be.visible;
    });
    cy.getElementByTestId('drop-down-button-container').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('type','button');
        expect($element).to.have.attr('aria-expanded','false');
        expect($element).contain(creds.name);
        //Click it
        cy.wrap($element).click().then(()=>{
            expect($element).to.have.attr('aria-expanded','true');
            cy.getElementByTestId('drop-down-item').then($element=>{
                expect($element).to.have.length(2);
                //first item
                expect($element[0]).to.be.visible;
                expect($element[0]).to.have.attr('type','button');
                expect($element[0]).to.have.attr('role','menuitem');
                expect($element[0]).to.have.attr('data-index','0');
                expect($element[0]).to.have.attr('tabindex','0');
                expect($element[0]).contain('Change Password');
                //second item
                expect($element[1]).to.be.visible;
                expect($element[1]).to.have.attr('type','button');
                expect($element[1]).to.have.attr('role','menuitem');
                expect($element[1]).to.have.attr('data-index','1');
                expect($element[1]).to.have.attr('tabindex','-1');
                expect($element[1]).contain('Log Out');
            });
        });
    });


});