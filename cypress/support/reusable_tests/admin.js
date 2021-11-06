
Cypress.Commands.add('testAdminPageElements',(viewport,creds)=>{
    cy.viewport(viewport);
    cy.login(creds.email,creds.password);

    cy.getElementByTestId('header-admin-link').click();

    cy.getElementByTestId('admin-tab-users').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('type','button');
        expect($element).to.have.attr('data-index','0');
        expect($element).contain('Users');
    });

    cy.getElementByTestId('admin-tab-suggestions').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('type','button');
        expect($element).to.have.attr('data-index','1');
        expect($element).contain('Suggestions');
    });

    cy.getElementByTestId('admin-users-new-manager').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('type','button');
        expect($element).contain('New Manager');
    });

    cy.getElementByTestId('admin-users-title').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Data Managers');
    });

    cy.getElementByTestId('filter-users-title').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Filter Users');
    });

    cy.getElementByTestId('filter-users-type').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Type:');
    });

    cy.getElementByTestId('filter-users-search').then($element=>{
        expect($element).to.be.visible;
    });

    cy.getElementByTestId('filter-users-search-button').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('type','button');
        expect($element).contain('Search');
    });

    cy.getElementByTestId('table').then($element=>{
        expect($element).to.be.visible;
    });

    cy.getElementByTestId('table-header').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.lengthOf(2);
    });

    cy.getElementByTestId('table-header-text').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.lengthOf(2);
        expect($element[0]).contain('Name');
        expect($element[1]).contain('Email');
    });

    cy.getElementByTestId('table-row').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.length.greaterThan(1);
    });

    cy.getElementByTestId('pagination-previous').then($element=>{
        expect($element).to.be.visible;
    });

    cy.getElementByTestId('pagination-next').then($element=>{
        expect($element).to.be.visible;
    });

    cy.getElementByTestId('pagination-page').then($element=>{
        expect($element).to.be.visible;
    });
    
});

Cypress.Commands.add('testAdminFilterUsers',(viewport,creds)=>{
    cy.viewport(viewport);
    cy.login(creds.email,creds.password);
    var type = 'lawyer';
    cy.getElementByTestId('header-admin-link').click();
    cy.getElementByTestId('filter-users-search').select(type);
    //Intercept Results
    cy.intercept(`/v1/users/count?&page=1&type=${type}`, req => {
        delete req.headers['if-none-match']
      }).as('usersCount');
    cy.getElementByTestId('filter-users-search-button').click();

    cy.wait('@usersCount');

    cy.get('@usersCount').then(interception=>{
        if(interception.response.body.count>0){
            //should be populated
            cy.getElementByTestId('table').then($element=>{
                expect($element).to.be.visible;
            });
            cy.getElementByTestId('table-row').then($element=>{
                expect($element).to.be.visible;
                expect($element).to.have.length.greaterThan(1);
            });           
        }else{
            //Should be empty
            cy.getElementByTestId('admin-search-not-found-title').then($element=>{
                expect($element).to.be.visible;
                expect($element).contain('No results found.');
            });

            cy.getElementByTestId('admin-search-not-found-body').then($element=>{
                expect($element).to.be.visible;
                expect($element).contain('Please refine your search');
            });
    
        }
    });
});

Cypress.Commands.add('testAdminFilterAddNewManagerElements',(viewport,creds)=>{
    cy.viewport(viewport);
    cy.login(creds.email,creds.password);
    
     //Waiting for Response
     cy.intercept('/v1/organizations/**');

    cy.getElementByTestId('header-admin-link').click();
    cy.getElementByTestId('admin-users-new-manager').click();
    cy.getElementByTestId('modal-header').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('New Data Manager');
    });
    cy.getElementByTestId('modal-close-button').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('type','button');
    });
    cy.getElementByTestId('name').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()[0]).contain('Name');
        expect($element.children()[1]).to.have.attr('name','name');
        expect($element.children()[1]).to.have.attr('placeholder',"Enter the manager's name");
        
    });
    cy.getElementByTestId('email').then($element=>{
        expect($element).to.be.visible;
        expect($element.children()[0]).contain('Email');
        expect($element.children()[1]).to.have.attr('name','email');
        expect($element.children()[1]).to.have.attr('placeholder',"Enter the manager's email");
    });

    cy.getElementByTestId('isAdminDataManager').then($element=>{
        expect($element).to.be.visible;
    });

    cy.getElementByTestId('modal-cancel-button').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('type','button');
        expect($element).contain('Cancel');
    });

    cy.getElementByTestId('modal-save-button').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('type','button');
        expect($element).contain('Save Changes');
    });
});

Cypress.Commands.add('testAdminFilterAddNewManagerAction',(viewport,creds,admin)=>{
    cy.viewport(viewport);
    cy.login(creds.email,creds.password);
    
     //Waiting for Response
     cy.intercept('/v1/organizations/**');

    cy.getElementByTestId('header-admin-link').click();
    cy.getElementByTestId('admin-users-new-manager').click();
    
    cy.getElementByTestId('name').type(admin.name);
    cy.getElementByTestId('email').type(admin.email);
    cy.getElementByTestId('isAdminDataManager').then($element=>{
        cy.wrap($element.children()).click();
    });

    cy.getElementByTestId('modal-save-button').click();
    //Reload Page
    cy.reload();
    cy.getElementByTestId('table-row-text').then($element=>{
        cy.wrap($element).each(($el)=>{
            const text =  $el.text()
            if(text === admin.name){
                //Delete Admin
                cy.getElementByTestId('table-row-action').then($element=>{
                    cy.wrap($element[0]).click();
                    cy.getElementByTestId('modal-save-button').click();
                });
            }
        });
    });  
});

Cypress.Commands.add('testAdminTrashBinElements',(viewport,creds)=>{
    cy.viewport(viewport);
    cy.login(creds.email,creds.password);
    
     //Waiting for Response
     cy.intercept('/v1/organizations/**');

    
    //Intercept
    cy.intercept('/v1/organizations?deleted=true').as('deletedOrganizations');
    cy.intercept('/v1/organizations?serviceDeleted=true').as('deletedOrgServices');
    //Click
    cy.getElementByTestId('header-admin-link').click();
     
    cy.wait(['@deletedOrganizations','@deletedOrgServices'])
    
    cy.getElementByTestId('admin-tab-trash-bin').click();

    cy.get('@deletedOrganizations').then(interception =>{
        if(!interception.response.body.organizations.length){
           //Test Empty State
            cy.getElementByTestId('admin-trash-bin-organizations-empty-state').then($element=>{
                expect($element).to.be.visible;
                expect($element).contain('No Organizations listed for deletion at this time');
            })
       }else{
           //Test non empty state
           cy.getElementByTestId('table').then($element=>{
               expect($element).to.be.visible;
           });
           cy.getElementByTestId('table-row').then($element=>{
               expect($element).to.be.visible;
               expect($element).to.have.length.greaterThan(1);
           });

           cy.getElementByTestId('table-header').then($element=>{
                expect($element).to.be.visible;
                expect($element).to.have.length.greaterThan(1);
           });
       }
    });

    cy.get('@deletedOrgServices').then((interception =>{
        if(!interception.response.body.organizations.length){
            //Test Empty State
            cy.log(interception.response.body.organizations)
             cy.getElementByTestId('admin-trash-bin-services-empty-state').then($element=>{
                 expect($element).to.be.visible;
                 expect($element).contain('No Organization Services listed for deletion at this time');
             })
        }else{
            //Test non empty state
            cy.getElementByTestId('table').then($element=>{
                expect($element).to.be.visible;
            });

            cy.getElementByTestId('table-header').then($element=>{
                expect($element).to.be.visible;
                expect($element).to.have.length.greaterThan(1);
            });

            cy.getElementByTestId('table-row').then($element=>{
                expect($element).to.be.visible;
                expect($element).to.have.length.greaterThan(1);
            });
        }
    }));

    cy.getElementByTestId('admin-trash-bin-title').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Trash Bin');
    });

    cy.getElementByTestId('admin-trash-bin-organizations-section-title').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Deleted Organizations');
    });

    cy.getElementByTestId('admin-trash-bin-services-section-title').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Deleted Services');
    });

    
});


Cypress.Commands.add('testAdminTrashBinViewOrganizationOrService',(viewport,creds,option,org)=>{
    cy.viewport(viewport);
    cy.login(creds.email,creds.password);
    
     //Waiting for Response
     cy.intercept('/v1/organizations/**');

    
    //Intercept
    cy.intercept('/v1/organizations?deleted=true').as('deletedOrganizations');
    cy.intercept('/v1/organizations?serviceDeleted=true').as('deletedOrgServices');
    //Click
    cy.getElementByTestId('header-admin-link').click();
     
    cy.wait(['@deletedOrganizations','@deletedOrgServices'])
    
    cy.getElementByTestId('admin-tab-trash-bin').click();

    cy.get('@deletedOrganizations').then(interception =>{
        if(interception.response.body.organizations.length){
           cy.getElementByTestId('table').then($element=>{
                expect($element).to.be.visible;
            });
            cy.getElementByTestId('table-row-action').then($element=>{
                expect($element).to.be.visible;
                //Table row actions counts all elements across tabs
                cy.get($element).contains(`View Deleted ${option}`).then($element=>{
                    cy.wrap($element).click();
                });
            });
        }
    });
});


Cypress.Commands.add('testAdminTrashBinDeleteOrRestoreOrganization',(viewport,creds,action)=>{
    cy.viewport(viewport);
    cy.login(creds.email,creds.password);
    
     //Waiting for Response
     cy.intercept('/v1/organizations/**');

    
    //Intercept
    cy.intercept('/v1/organizations?deleted=true').as('deletedOrganizations');
    cy.intercept('/v1/organizations?serviceDeleted=true').as('deletedOrgServices');
    //Click
    cy.getElementByTestId('header-admin-link').click();
     
    cy.wait(['@deletedOrganizations','@deletedOrgServices'])
    
    cy.getElementByTestId('admin-tab-trash-bin').click();

    cy.get('@deletedOrganizations').then(interception =>{
        if(interception.response.body.organizations.length){
           cy.getElementByTestId('table').then($element=>{
                expect($element).to.be.visible;
            });
            cy.getElementByTestId('table-row-action').then($element=>{
                expect($element).to.be.visible;
                //Table row actions counts all elements across tabs
                cy.get($element).contains(`${action} Organization`).click();
                cy.getElementByTestId('modal-save-button').then($element=>{
                    expect($element).to.be.visible;
                    expect($element).contain('Save Changes');
                    expect($element).to.have.attr('type','button');
                    cy.wrap($element).click();
                })
            });
        }
    });
});

Cypress.Commands.add('testAdminTrashBinDeleteOrRestoreServices',(viewport,creds,action)=>{
    cy.viewport(viewport);
    cy.login(creds.email,creds.password);
    
     //Waiting for Response
     cy.intercept('/v1/organizations/**');

    
    //Intercept
    cy.intercept('/v1/organizations?deleted=true').as('deletedOrganizations');
    cy.intercept('/v1/organizations?serviceDeleted=true').as('deletedOrgServices');
    //Click
    cy.getElementByTestId('header-admin-link').click();
     
    cy.wait(['@deletedOrganizations','@deletedOrgServices'])
    
    cy.getElementByTestId('admin-tab-trash-bin').click();

    cy.get('@deletedOrgServices').then(interception =>{
        if(interception.response.body.organizations.length){
            if(interception.response.body.organizations.length){
                //Test non empty state
              cy.getElementByTestId('table').then($element=>{
                   expect($element).to.be.visible;
               });

               cy.getElementByTestId('table-row-action').then($element=>{
                expect($element).to.be.visible;
                //Table row actions counts all elements across tabs
                cy.get($element).contains(`${action} Service`).click();
                cy.getElementByTestId('modal-save-button').then($element=>{
                    expect($element).to.be.visible;
                    expect($element).contain('Save Changes');
                    expect($element).to.have.attr('type','button');
                    cy.wrap($element).click();
                })
            });
           }
        }
    }); 
});


