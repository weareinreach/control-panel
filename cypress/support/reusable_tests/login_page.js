Cypress.Commands.add('testLoginPageElements',(viewport)=>{
    cy.viewport(viewport);
    cy.getElementByTestId('form-login-title').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Login');
    });

    cy.getElementByTestId('login-form-email-input').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('placeholder','Email');
    });

    cy.getElementByTestId('login-form-password-input').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('placeholder','Password');
        expect($element).to.have.attr('type','password');
    });

    cy.getElementByTestId('password-input-show-button').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('type','button');
    });
    cy.getElementByTestId('login-form-submit-button').them($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('type','button');
    });
});

Cypress.Commands.add('testLoginPageLoginActionBadCreds',(viewport,credentials)=>{
    cy.viewport(viewport);
    cy.getElementByTestId('login-form-email-input').type(credentials.username);
    cy.getElementByTestId('login-form-password-input').type(credentials.password);
    cy.getElementByTestId('password-input-show-button').click();
    cy.getElementByTestId('login-form-submit-button').click();
    //Verify Unable to Login Alert
    cy.getElementByTestId('alert-container').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('role','alert');
    });
    cy.getElementByTestId('alert-icon').then($element=>{
        expect($element).to.be.visible;
    });
    cy.getElementByTestId('alert-title').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Unable to login');
    });
    cy.getElementByTestId('alert-description').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Please try again.');
    });

});