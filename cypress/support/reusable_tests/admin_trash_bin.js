
Cypress.Commands.add('testAdminTrashBinElements', (viewport, creds, state) => {
    cy.viewport(viewport);
    cy.login(creds.email, creds.password);

    //Waiting for Response
    cy.intercept('/v1/organizations/**');


    //Intercept
    cy.intercept('/v1/organizations?deleted=true').as('deletedOrganizations');
    cy.intercept('/v1/organizations?serviceDeleted=true').as('deletedOrgServices');
    //Click
    cy.getElementByTestId('header-admin-link').click();

    cy.wait(['@deletedOrganizations', '@deletedOrgServices'])

    cy.getElementByTestId('admin-tab-trash-bin').click();

    cy.get('@deletedOrganizations').then(() => {
        // eslint-disable-next-line default-case
        switch (state) {
            case 'empty':
                //Test Empty State
                cy.getElementByTestId('admin-trash-bin-organizations-empty-state').then($element => {
                    expect($element).to.be.visible;
                    expect($element).contain('No Organizations listed for deletion at this time');
                })
                break;
            case 'non-empty':
                //Test non empty state
                cy.getElementByTestId('admin-trash-bin-table-orgs').then($element => {
                    expect($element).to.be.visible;
                });
                cy.getElementByTestId('table-row-text-0-org').then($element => {
                    expect($element).to.be.visible;
                });

                cy.getElementByTestId('table-header').then($element => {
                    expect($element).to.be.visible;
                });
                break;
        }
    });

    cy.get('@deletedOrgServices').then((interception => {
        // eslint-disable-next-line default-case
        switch (state) {
            case 'empty':
                //Test Empty State
                cy.log(interception.response.body.organizations)
                cy.getElementByTestId('admin-trash-bin-services-empty-state').then($element => {
                    expect($element).to.be.visible;
                    expect($element).contain('No Organization Services listed for deletion at this time');
                })
                break;
            case 'non-empty':
                //Test non empty state
                cy.getElementByTestId('admin-trash-bin-table-services').then($element => {
                    expect($element).to.be.visible;
                });

                cy.getElementByTestId('table-header').then($element => {
                    expect($element).to.be.visible;
                    expect($element).to.have.length.greaterThan(1);
                });

                cy.getElementByTestId('table-row-text-0-org').then($element => {
                    expect($element).to.be.visible;
                });
                break;
        }
    }));

    cy.getElementByTestId('admin-trash-bin-title').then($element => {
        expect($element).to.be.visible;
        expect($element).contain('Trash Bin');
    });

    cy.getElementByTestId('admin-trash-bin-organizations-section-title').then($element => {
        expect($element).to.be.visible;
        expect($element).contain('Deleted Organizations');
    });

    cy.getElementByTestId('admin-trash-bin-services-section-title').then($element => {
        expect($element).to.be.visible;
        expect($element).contain('Deleted Services');
    });


});


Cypress.Commands.add('testAdminTrashBinViewOrganization', (viewport, creds, number, org) => {
    cy.viewport(viewport);
    cy.login(creds.email, creds.password);

    //Waiting for Response
    cy.intercept('/v1/organizations/**');

    //Intercept
    cy.intercept('/v1/organizations?deleted=true').as('deletedOrganizations');
    cy.intercept('/v1/organizations?serviceDeleted=true').as('deletedOrgServices');
    //Click
    cy.getElementByTestId('header-admin-link').click();

    cy.wait(['@deletedOrganizations', '@deletedOrgServices'])

    cy.getElementByTestId('admin-tab-trash-bin').click();

    cy.get('@deletedOrganizations').then(interception => {
        if (interception.response.body.organizations.length) {
            cy.getElementByTestId('admin-trash-bin-table-orgs').then($element => {
                expect($element).to.be.visible;
            });
            cy.getElementByTestId('table-row-action-0-view-organization').then($element => {
                cy.expect($element).to.be.visible;
                
                cy.wrap($element[1]).click();
                cy.location().should($loc => {
                    expect($loc.pathname).to.be.eq(`/organizations/${org._id}`)
                })
            });
        }
    });
});

Cypress.Commands.add('testAdminTrashBinDeleteOrRestoreOrganization', (viewport, creds, action) => {
    cy.viewport(viewport);
    cy.login(creds.email, creds.password);

    //Waiting for Response
    cy.intercept('/v1/organizations/**');


    //Intercept
    cy.intercept('/v1/organizations?deleted=true').as('deletedOrganizations');
    cy.intercept('/v1/organizations?serviceDeleted=true').as('deletedOrgServices');
    //Click
    cy.getElementByTestId('header-admin-link').click();

    cy.wait(['@deletedOrganizations', '@deletedOrgServices'])

    cy.getElementByTestId('admin-tab-trash-bin').click();

    cy.get('@deletedOrganizations').then(interception => {
        if (interception.response.body.organizations.length) {
            cy.getElementByTestId('admin-trash-bin-table-orgs').then($element => {
                expect($element).to.be.visible;
            });
            cy.getElementByTestId('table-row-action-1-delete-organization').then($element => {
                expect($element).to.be.visible;
                //Table row actions counts all elements across tabs
                cy.get($element).contains('Delete Organization').click();
                cy.getElementByTestId('modal-message').then($element => {
                    expect($element).to.be.visible;
                });
                cy.getElementByTestId('modal-save-button').then($element => {
                    expect($element).to.be.visible;
                    expect($element).contain('Save Changes');
                    expect($element).to.have.attr('type', 'button');
                    cy.wrap($element).click();
                })
            });
        }
    });
});

Cypress.Commands.add('testAdminTrashBinDeleteOrRestoreServices', (viewport, creds, action) => {
    cy.viewport(viewport);
    cy.login(creds.email, creds.password);

    //Waiting for Response
    cy.intercept('/v1/organizations/**');


    //Intercept
    cy.intercept('/v1/organizations?deleted=true').as('deletedOrganizations');
    cy.intercept('/v1/organizations?serviceDeleted=true').as('deletedOrgServices');
    //Click
    cy.getElementByTestId('header-admin-link').click();

    cy.wait(['@deletedOrganizations', '@deletedOrgServices'])

    cy.getElementByTestId('admin-tab-trash-bin').click();

    cy.get('@deletedOrgServices').then(interception => {
        if (interception.response.body.organizations.length) {
            //Test non empty state
            cy.getElementByTestId('admin-trash-bin-table-services').then($element => {
                expect($element).to.be.visible;
            });
            let element = action === 'Restore' ? 'table-row-action-2-restore-service':'table-row-action-1-delete-service'
            cy.getElementByTestId(element).then($element => {
                expect($element).to.be.visible;
                //Table row actions counts all elements across tabs
                cy.get($element).contains(`${action} Service`).click();
                cy.getElementByTestId('modal-message').then($element => {
                    expect($element).to.be.visible;
                });
                cy.getElementByTestId('modal-save-button').then($element => {
                    expect($element).to.be.visible;
                    expect($element).contain('Save Changes');
                    expect($element).to.have.attr('type', 'button');
                    cy.wrap($element).click();
                })
            });
        }
    });
});

Cypress.Commands.add('testDataManagerSoftDeleteOrganization', (viewport, creds, org) => {
    cy.viewport(viewport);
    cy.login(creds.email, creds.password);

    //Navigate to created Org Service
    cy.visit(Cypress.env('baseUrl').concat(
        Cypress.env('route_organizations'),
        `/${org._id}`));
    //wait for Response
    cy.intercept('/v1/organizations/**').as('organizations');
    cy.wait('@organizations');

    cy.getElementByTestId('drop-down-button-container').then($element => {
        expect($element[3]).to.be.visible;
        expect($element[3]).contain("More");
        cy.wrap($element[3]).click().then(() => {
            cy.getElementByTestId('drop-down-item').then($element => {
                expect($element[9]).to.be.visible;
                expect($element[9]).contain("Delete");
                cy.wrap($element[9]).click({
                    force: true
                });
                cy.getElementByTestId('modal-save-button').then($element => {
                    expect($element).to.be.visible;
                    cy.wrap($element).click();
                });
            })
        })

    })

})

Cypress.Commands.add('testDataManagerSoftDeleteService', (viewport, creds, org) => {
    cy.viewport(viewport);
    cy.login(creds.email, creds.password);

    //Navigate to created Org Service
    cy.visit(Cypress.env('baseUrl').concat(
        Cypress.env('route_organizations'),
        `/${org._id}`,
        '/services',
        `/${org.services[0]._id}`));
    //wait for Response
    cy.intercept('/v1/organizations/**').as('organizations');
    cy.wait('@organizations');

    cy.getElementByTestId('drop-down-button-container').then($element => {
        expect($element[1]).to.be.visible;
        expect($element[1]).contain("More");
        cy.wrap($element[1]).click().then(() => {
            cy.getElementByTestId('drop-down-item').then($element => {
                expect($element[3]).to.be.visible;
                expect($element[3]).contain("Delete");
                cy.wrap($element[3]).click({
                    force: true
                });
                cy.getElementByTestId('modal-save-button').then($element => {
                    expect($element).to.be.visible;
                    cy.wrap($element).click();
                });
            });
        });

    });

});