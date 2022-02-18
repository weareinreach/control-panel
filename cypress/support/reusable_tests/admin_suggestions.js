/* eslint-disable no-unused-expressions */
Cypress.Commands.add('testAdminSuggestionElements',(viewport,creds,owner,org)=>{
    cy.viewport(viewport);
    cy.login(creds.email,creds.password);
    

    //Intercept
    cy.intercept('/v1/organizations?pendingOwnership=true').as('pending-affiliates');
    cy.intercept('/v1/organizations?pending=true').as('pending-orgs');
    cy.intercept('/v1/suggestions').as('suggestions');

    cy.getElementByTestId('header-admin-link').click();
    cy.getElementByTestId('admin-tab-suggestions').then($element =>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('type', 'button');
        expect($element).to.have.attr('data-index', '1');
        expect($element).contain('Suggestions');
        cy.wrap($element).click();
    });

    cy.wait('@pending-affiliates').then(response=>{
        if(response.response.body.organizations.length>0){
            cy.getElementByTestId('pending-affiliates-table').then($element=>{
                expect($element).to.be.visible;
            });
            cy.getElementByTestId('table-header-text-email').then($element=>{
                expect($element).to.be.visible;
                expect($element).contain('Email');
            });
            // cy.getElementByTestId('table-header-text-org.name').then($element=>{
            //     expect($element).to.be.visible;
            //     expect($element).contain('Organization Name');
            // })
            cy.getElementByTestId('table-row-text-0-email').then($element=>{
                expect($element).to.be.visible;
                expect($element).contain(owner.email);
            });
            // cy.getElementByTestId('table-row-text-0-org.name').then($element=>{
            //     expect($element).to.be.visible;
            //     expect($element).contain(org.name);
            // });
        }else{
            cy.getElementByTestId('pending-affiliates-text').then($element=>{
                expect($element).to.be.visible;
                expect($element).contain('No pending affiliates at this time');
            });
        }
    });
    cy.wait('@pending-orgs').then(response=>{
        if(response.response.body.organizations.length>0){
            cy.getElementByTestId('suggested-edits-table').then($element=>{
                expect($element).to.be.visible;
            });
            cy.getElementByTestId('table-header-text-userEmail').then($element=>{
                expect($element).to.be.visible;
                expect($element).contain('Suggested By');                
            });
            cy.getElementByTestId('table-header-text-field').then($element=>{
                expect($element).to.be.visible;
                expect($element).contain('Field');                
            });
            cy.getElementByTestId('table-header-text-value').then($element=>{
                expect($element).to.be.visible;
                expect($element).contain('Value');                
            });
            cy.getElementByTestId('table-row-text-0-useremail').then($element=>{
                expect($element).to.be.visible;
                expect($element.length).to.be.greaterThan(0)
            });
            cy.getElementByTestId('table-row-text-0-field').then($element=>{
                expect($element).to.be.visible;
                expect($element.length).to.be.greaterThan(0)
            });
            cy.getElementByTestId('table-row-text-0-value').then($element=>{
                expect($element).to.be.visible;
                expect($element.length).to.be.greaterThan(0);
            });
        }else{
            cy.getElementByTestId('suggested-edits-text').then($element=>{
                expect($element).to.be.visible;
                expect($element).contain('No suggested edits at this time');
            });
        }
       
    });;
    cy.wait('@suggestions').then(response=>{
        if(response.response.body.length>0){
            cy.getElementByTestId('suggested-organizations-table').then($element=>{
                expect($element).to.be.visible;
            });
            cy.getElementByTestId('table-header-text-name').then($element=>{
                expect($element).to.be.visible;
                expect($element).contain('Name');                
            });
        }else{
            cy.getElementByTestId('suggested-edits-text').then($element=>{
                expect($element).to.be.visible;
                expect($element).contain('No suggested organizations at this time');
            });
        }
       
    });;

    

    cy.getElementByTestId('section-title').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.be.lengthOf(3);
        expect($element[0]).contain('Pending Affiliates');
        expect($element[1]).contain('Suggested Edits');
        expect($element[2]).contain('Suggested Organizations');
    });

    
})


Cypress.Commands.add('testAffiliatePendingElements',(viewport,creds,org)=>{
    cy.viewport(viewport);
    cy.login(creds.email,creds.password);

    cy.getElementByTestId('header-admin-link').click();

    cy.getElementByTestId('admin-tab-suggestions').then($element =>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('type', 'button');
        expect($element).to.have.attr('data-index', '0');
        expect($element).contain('Suggestions');
    });

    cy.getElementByTestId('section-title').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.be.lengthOf(3);
        expect($element[0]).contain('Pending Affiliates');
        expect($element[1]).contain('Suggested Affiliates');
        expect($element[2]).contain('Pending Affiliates');

    })
})


