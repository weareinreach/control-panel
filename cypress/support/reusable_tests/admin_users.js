Cypress.Commands.add('testAdminPageElements', (viewport, creds) => {
  cy.viewport(viewport);
  cy.login(creds.email, creds.password);

  cy.getElementByTestId('header-admin-link').click();

  cy.getElementByTestId('admin-tab-users').then(($element) => {
    expect($element).to.be.visible;
    expect($element).to.have.attr('type', 'button');
    expect($element).to.have.attr('data-index', '0');
    expect($element).contain('Users');
  });

  cy.getElementByTestId('admin-tab-suggestions').then(($element) => {
    expect($element).to.be.visible;
    expect($element).to.have.attr('type', 'button');
    expect($element).to.have.attr('data-index', '1');
    expect($element).contain('Suggestions');
  });

  cy.getElementByTestId('admin-tab-reviews').then(($element) => {
    expect($element).to.be.visible;
    expect($element).to.have.attr('type', 'button');
    expect($element).to.have.attr('data-index', '2');
    expect($element).contain('Reviews');
  });

  cy.getElementByTestId('admin-users-new-manager').then(($element) => {
    expect($element).to.be.visible;
    expect($element).to.have.attr('type', 'button');
    expect($element).contain('New Manager');
  });

  cy.getElementByTestId('admin-users-title').then(($element) => {
    expect($element).to.be.visible;
    expect($element).contain('All Users');
  });

  cy.getElementByTestId('filter-users-title').then(($element) => {
    expect($element).to.be.visible;
    expect($element).contain('Filter Users');
  });

  cy.getElementByTestId('filter-users-type').then(($element) => {
    expect($element).to.be.visible;
    expect($element).contain('Type:');
  });

  cy.getElementByTestId('filter-users-search').then(($element) => {
    expect($element).to.be.visible;
  });

  cy.getElementByTestId('filter-users-search-button').then(($element) => {
    expect($element).to.be.visible;
    expect($element).to.have.attr('type', 'button');
    expect($element).contain('Search');
  });

  cy.getElementByTestId('admin-users-table').then(($element) => {
    expect($element).to.be.visible;
  });

  cy.getElementByTestId('table-header').then(($element) => {
    expect($element).to.be.visible;
  });

  cy.getElementByTestId('table-header-text-name').then(($element) => {
    expect($element).to.be.visible;
    expect($element).contain('Name');
  });
  cy.getElementByTestId('table-header-text-email').then(($element) => {
    expect($element).to.be.visible;
    expect($element).contain('Email');
  });

  cy.getElementByTestId('table-row-text-0-name').then(($element) => {
    expect($element).to.be.visible;
  });

  cy.getElementByTestId('pagination-previous').then(($element) => {
    expect($element).to.be.visible;
  });

  cy.getElementByTestId('pagination-next').then(($element) => {
    expect($element).to.be.visible;
  });

  cy.getElementByTestId('pagination-page').then(($element) => {
    expect($element).to.be.visible;
  });
});

Cypress.Commands.add('testAdminFilterUsers', (viewport, creds) => {
  //All possible Users
  let userTypes = Cypress.env('userTypes');

  cy.viewport(viewport);
  cy.login(creds.email, creds.password);
  userTypes.forEach((type) => {
    cy.getElementByTestId('header-admin-link').click();
    cy.getElementByTestId('filter-users-search').select(type);
    //Intercept Results
    cy.intercept(`/v1/users/count?&page=1&type=*`, (req) => {
      delete req.headers['if-none-match'];
    }).as('usersCount');

    cy.getElementByTestId('filter-users-search-button').click();
    cy.wait('@usersCount');

    cy.get('@usersCount').then((interception) => {
      if (interception.response.body.count > 0) {
        //should be populated
        cy.getElementByTestId('admin-users-table').then(($element) => {
          expect($element).to.be.visible;
        });
        cy.getElementByTestId('table-row-text-0-name').then(($element) => {
          expect($element).to.be.visible;
        });
      } else {
        //Should be empty
        cy.getElementByTestId('admin-search-not-found-title').then(
          ($element) => {
            expect($element).to.be.visible;
            expect($element).contain('No results found.');
          }
        );

        cy.getElementByTestId('admin-search-not-found-body').then(
          ($element) => {
            expect($element).to.be.visible;
            expect($element).contain('Please refine your search');
          }
        );
      }
    });
  });
});

Cypress.Commands.add(
  'testAdminFilterAddNewManagerElements',
  (viewport, creds) => {
    cy.viewport(viewport);
    cy.login(creds.email, creds.password);

    //Waiting for Response
    cy.intercept('/v1/organizations/**');

    cy.getElementByTestId('header-admin-link').click();
    cy.getElementByTestId('admin-users-new-manager').click();
    cy.getElementByTestId('modal-header').then(($element) => {
      expect($element).to.be.visible;
      expect($element).contain('New Data Manager');
    });
    cy.getElementByTestId('modal-close-button').then(($element) => {
      expect($element).to.be.visible;
      expect($element).to.have.attr('type', 'button');
    });
    cy.getElementByTestId('name').then(($element) => {
      expect($element).to.be.visible;
      expect($element.children()[0]).contain('Name');
      expect($element.children()[1]).to.have.attr('name', 'name');
      expect($element.children()[1]).to.have.attr(
        'placeholder',
        "Enter the manager's name"
      );
    });
    cy.getElementByTestId('email').then(($element) => {
      expect($element).to.be.visible;
      expect($element.children()[0]).contain('Email');
      expect($element.children()[1]).to.have.attr('name', 'email');
      expect($element.children()[1]).to.have.attr(
        'placeholder',
        "Enter the manager's email"
      );
    });

    cy.getElementByTestId('isAdminDataManager').then(($element) => {
      expect($element).to.be.visible;
    });

    cy.getElementByTestId('modal-cancel-button').then(($element) => {
      expect($element).to.be.visible;
      expect($element).to.have.attr('type', 'button');
      expect($element).contain('Cancel');
    });

    cy.getElementByTestId('modal-save-button').then(($element) => {
      expect($element).to.be.visible;
      expect($element).to.have.attr('type', 'button');
      expect($element).contain('Save Changes');
    });
  }
);

Cypress.Commands.add(
  'testAdminFilterAddNewManagerAction',
  (viewport, creds, admin) => {
    cy.viewport(viewport);
    cy.login(creds.email, creds.password);

    //Waiting for Response
    cy.intercept('/v1/organizations/**');

    cy.getElementByTestId('header-admin-link').click();
    cy.getElementByTestId('admin-users-new-manager').click();

    cy.getElementByTestId('name').type(admin.name);
    cy.getElementByTestId('email').type(admin.email);
    cy.getElementByTestId('isAdminDataManager').then(($element) => {
      cy.wrap($element.children()).click();
    });

    cy.getElementByTestId('modal-save-button').click();
    //Reload Page
    cy.reload();
    cy.getElementByTestId('table-row-action-1-delete').then(($element) => {
      cy.wrap($element[0]).click();
      cy.getElementByTestId('modal-save-button').click();
    });
  }
);

Cypress.Commands.add('testAdminViewUserDetails', (viewport, creds) => {
  cy.viewport(viewport);
  cy.login(creds.email, creds.password);

  //Waiting for Response
  cy.intercept('/v1/users**').as('users');

  cy.getElementByTestId('header-admin-link').click();
  cy.wait('@users').then((response) => {
    //There are users
    cy.getElementByTestId('table-row-action-0-view').then(($element) => {
      cy.wrap($element[0]).click();
      cy.getElementByTestId('modal-header').then(($element) => {
        expect($element).to.be.visible;
        expect($element).contain('Data Manager Details');
      });
      cy.getElementByTestId('name').then(($element) => {
        expect($element).to.be.visible;
        expect($element).contain('Name');
      });
      cy.getElementByTestId('email').then(($element) => {
        expect($element).to.be.visible;
        expect($element).contain('Email');
      });
      cy.getElementByTestId('age').then(($element) => {
        expect($element).to.be.visible;
        expect($element).contain('Age');
      });
      cy.getElementByTestId('countryOfOrigin').then(($element) => {
        expect($element).to.be.visible;
        expect($element).contain('Country of Origin');
      });
      cy.getElementByTestId('currentLocation').then(($element) => {
        expect($element).to.be.visible;
        expect($element).contain('Current Location');
      });
      cy.getElementByTestId('ethnicityRace').then(($element) => {
        expect($element).to.be.visible;
        expect($element).contain('Ethnicity');
      });
      cy.getElementByTestId('immigrationStatus').then(($element) => {
        expect($element).to.be.visible;
        expect($element).contain('Immigration Status');
      });
      cy.getElementByTestId('sogIdentity').then(($element) => {
        expect($element).to.be.visible;
        expect($element).contain('Identity');
      });
      cy.getElementByTestId('orgType').then(($element) => {
        expect($element).to.be.visible;
        expect($element).contain('Organization Type');
      });
      cy.getElementByTestId('catalogType')
        .scrollIntoView()
        .then(($element) => {
          expect($element).to.be.visible;
          expect($element).contain('Catalog Type');
        });
      cy.getElementByTestId('updatedAt').then(($element) => {
        expect($element).to.be.visible;
        expect($element).contain('Last Updated');
      });
      cy.getElementByTestId('isAdminDataManager').then(($element) => {
        expect($element).to.be.visible;
        expect($element).contain('Admin Data Manager');
      });
      cy.getElementByTestId('isProfessional').then(($element) => {
        expect($element).to.be.visible;
        expect($element).contain('Professional');
      });
    });
  });
});
