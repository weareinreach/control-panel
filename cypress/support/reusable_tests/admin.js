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
    })
    
});

Cypress.Commands.add('testAdminFilterUsers',(viewport,creds)=>{
    cy.viewport(viewport);
    cy.login(creds.email,creds.password);

    cy.getElementByTestId('header-admin-link').click();
    cy.getElementByTestId('filter-users-search').select('lawyer');
    cy.getElementByTestId('filter-users-search-button').click();
    //Should be empty
    cy.getElementByTestId('admin-search-not-found-title').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('No results found.');
    });

    cy.getElementByTestId('admin-search-not-found-body').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Please refine your search');
    });
    
    cy.getElementByTestId('filter-users-search').select('dataManager');
    cy.getElementByTestId('filter-users-search-button').click();
    cy.wait(500)
    //should be populated
    cy.getElementByTestId('table').then($element=>{
        expect($element).to.be.visible;
    });
    cy.getElementByTestId('table-row').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.length.greaterThan(1);
    });
});

Cypress.Commands.add('testAdminFilterAddNewManagerElements',(viewport,creds,newuser)=>{
    cy.viewport(viewport);
    cy.login(creds.email,creds.password);

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


})