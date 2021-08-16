Cypress.Commands.add('testHeaderElementsNoLogin',(viewport)=>{
    cy.viewport(viewport);
    cy.getElementByTestId('layout').then($element =>{
        expect($element).to.be.visible;
        expect($element).contain('Login');
    });
});


Cypress.Commands.add('testHeaderElementsLogin',(viewport)=>{
    cy.viewport(viewport);
})