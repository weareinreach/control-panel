/* eslint-disable no-unused-expressions */
Cypress.Commands.add('testAdminSuggestionElements',(viewport,creds)=>{
    cy.viewport(viewport);
    cy.login(creds.email,creds.password);
    

    //Intercept
    cy.intercept('/v1/organizations?pendingOwnership=true').as('pending-affiliates');
    cy.intercept('/v1/organizations?&page=1&pending=true').as('pending-orgs');
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
        }else{
            cy.getElementByTestId('pending-affiliates-text').then($element=>{
                expect($element).to.be.visible;
                expect($element).contain('No pending affiliates at this time');
            });
        }
    });

    cy.wait('@suggestions').then(response=>{
        if(response.response.body.length>0){
            cy.getElementByTestId('suggested-edits-table').then($element=>{
                expect($element).to.be.visible;
            });
            cy.getElementByTestId('table-header-text-useremail').then($element=>{
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

    cy.wait('@pending-orgs').then(response=>{
        if(response.response.body.organizations.length>0){
            cy.getElementByTestId('suggested-organizations-table').then($element=>{
                expect($element).to.be.visible;
            });
        }else{
            cy.scrollTo('bottom',{ensureScrollable: false});
            cy.getElementByTestId('suggested-organizations-text').then($element=>{
                expect($element).to.be.visible;
                expect($element).contain('No suggested organizations at this time');
            });
        }
       
    });
    
    cy.getElementByTestId('section-title').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.be.lengthOf(3);
        expect($element[0]).contain('Pending Affiliates');
        expect($element[1]).contain('Suggested Edits');
        expect($element[2]).contain('Suggested Organizations');
    });

    
});


Cypress.Commands.add('testAffiliatePendingApproveDecline',(viewport,creds,org,createdOwner,approve)=>{
    cy.viewport(viewport);
    cy.login(creds.email,creds.password);
    cy.intercept('/v1/organizations?pendingOwnership=true').as('pending-affiliates');
    cy.getElementByTestId('header-admin-link').click();

    cy.wait('@pending-affiliates').then(response=>{
        cy.getElementByTestId('admin-tab-suggestions').click();
        let responseObject = response.response;
        if(responseObject.statusCode !==304){
            //Clear then test
            for(let i=0;i<responseObject.body.organizations.length;i++){
                cy.deleteOrgById(responseObject.body.organizations[i]._id);
            }
        }

        cy.createOwnerObject(createdOwner.body.userInfo).then(ownerObject => {
                //Add Pending Onwner
                org.owners.push(ownerObject);
                    cy.addOrg(org).then(createdOrganization => {
                        cy.reload(true);
                        cy.getElementByTestId('admin-tab-suggestions').click();
                        cy.getElementByTestId('pending-affiliates-table').then($element=>{
                            expect($element).to.be.visible;
                        });
                        cy.getElementByTestId('table-header-text-email').then($element=>{
                            expect($element).to.be.visible;
                            expect($element).contain('Email');
                        });
                        cy.getElementByTestId('table-row-text-0-email').then($element=>{
                            expect($element).to.be.visible;
                            expect($element).contain(ownerObject.email);
                        });
                        cy.getElementByTestId('table-header-text-org-name').then($element=>{
                            expect($element).to.be.visible;
                            expect($element).contain('Organization Name');
                        });
                        cy.getElementByTestId('table-row-text-0-org-name').then($element=>{
                            expect($element).to.be.visible;
                            expect($element).contain(createdOrganization.body.organization.name);
                        });

                        //Approve or Decline
                        let elementAction = approve ?'table-row-action-1-approve' :   'table-row-action-2-decline';
                        let headerText = approve ? 'Accept the request for affiliation' : 'Decline the request for affiliation';
                        let elementText = approve ? 'Approve' : 'Decline'

                            cy.getElementByTestId(elementAction).then($element=>{
                                expect($element).to.be.visible;
                                expect($element).contain(elementText);
                                cy.wrap($element).click().then(()=>{
                                    cy.getElementByTestId('modal-header').then($element=>{
                                        expect($element).to.be.visible;
                                        expect($element).contain(headerText);
                                    });
                                    cy.getElementByTestId('modal-save-button').then($element=>{
                                        expect($element).to.be.visible;
                                        expect($element).to.have.attr('type','button');
                                        expect($element).contain('Save Changes');
                                        cy.wrap($element).click();
                                    })
                                });
                            });
                });
            });    
    });
});


Cypress.Commands.add('testViewDeclineSuggest',(viewport,creds,org,suggestion,view)=>{
    cy.viewport(viewport);
    cy.login(creds.email,creds.password);
    cy.intercept('/v1/suggestions').as('suggestions');
    cy.getElementByTestId('header-admin-link').click();
    

    cy.wait('@suggestions').then(response=>{
        let responseObject = response.response;
        for(let i=0;i<responseObject.body.length;i++){
            cy.log(responseObject.body[i]);
            cy.deleteSuggestion(responseObject.body[i]._id);
        }
        cy.addSuggestion(suggestion).then(()=>{
            cy.reload(true);
            //reclick the suggestion tab
            cy.getElementByTestId('admin-tab-suggestions').click();
            cy.getElementByTestId('table-row-text-0-useremail').then($element=>{
                expect($element).to.be.visible;
                expect($element).contain(suggestion.userEmail);
            });
            cy.getElementByTestId('table-row-text-0-field').then($element=>{
                expect($element).to.be.visible;
                expect($element).contain(suggestion.field);
            });
            cy.getElementByTestId('table-row-text-0-value').then($element=>{
                expect($element).to.be.visible;
                expect($element).contain(suggestion.value);
            });

            //Click View or Decline
            let elementAction = view ? 'table-row-action-0-view-organization' : 'table-row-action-1-decline';
            let elementText = view ? 'View Organization' : 'Decline';

            cy.getElementByTestId(elementAction).filter(':visible').then($element=>{
                expect($element).to.be.visible;
                expect($element).contain(elementText);
                cy.wrap($element).click().then(()=>{
                    if(view){
                        cy.location().should($loc=>{
                            expect($loc.pathname).to.be.eq(`/organizations/${org._id}`);
                        });

                    }else{
                        cy.getElementByTestId('modal-header').then($element=>{
                            expect($element).to.be.visible;
                            expect($element).contain('Decline the suggested edit');
                        });
                        cy.getElementByTestId('modal-message').then($element=>{
                            expect($element).to.be.visible;
                            expect($element).contain("Are you sure? You can't undo this action afterwards.");
                        })
                        cy.getElementByTestId('modal-save-button').then($element=>{
                            expect($element).to.be.visible;
                            expect($element).to.have.attr('type','button');
                            expect($element).contain('Save Changes');
                            cy.wrap($element).click();
                        })
                    }
                });

            });

        });
        

        
    });
});

