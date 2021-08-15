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


});