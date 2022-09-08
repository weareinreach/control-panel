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
    cy.getElementByTestId('login-form-submit-button').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('type','button');
    });
});

Cypress.Commands.add('testLoginPageLoginActionBadCreds',(viewport,username,password)=>{
    cy.viewport(viewport);
    cy.getElementByTestId('login-form-email-input').type(username);
    cy.getElementByTestId('login-form-password-input').type(password);
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

Cypress.Commands.add('testLoginPageLoginActionGoodCreds',(viewport,username,password)=>{
    cy.viewport(viewport);
    cy.getElementByTestId('login-form-email-input').type(username);
    cy.getElementByTestId('login-form-password-input').type(password);
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
        expect($element).contain('Success.');
    });
    cy.getElementByTestId('alert-description').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Redirecting to the portal');
    });
});

Cypress.Commands.add('testLogOut',(viewport,username,password)=>{
    cy.viewport(viewport);
    cy.login(username,password);
    //Verify Logged in
    cy.getElementByTestId('layout').then($element =>{
        expect($element).to.be.visible;
    });
    cy.getElementByTestId('header-home-link').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('href','/');
        expect($element).contain('Home');
    });
    //LOG OUT
    cy.getElementByTestId('drop-down-button-container').click().then(()=>{
        cy.getElementByTestId('drop-down-item').then($element=>{
            //second item on the dropdown
            cy.wrap($element[1]).click({force:true})
        });
    });
    cy.wait(1000)
    //Verify Logged Out
    cy.getElementByTestId('form-login-title').then($element =>{
        expect($element).to.be.visible;
        expect($element).contain('Login');
    });
});