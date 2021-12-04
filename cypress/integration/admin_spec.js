/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/// <reference types="cypress" />
//compound url

//Test Suite
describe('Admin Form Tests', () => {

    let viewports = [Cypress.env('desktop')];

    beforeEach(() => {
        cy.visit(Cypress.env('baseUrl'));
        cy.fixture('user_new.json').as('user_good');
        cy.fixture('organization_search.json').as('organization');
        cy.fixture('organization_deleted.json').as('organization_deleted');
        cy.fixture('admin_new.json').as('admin');
    });
    afterEach(() => {
        cy.deleteUsersIfExist();
        cy.deleteOrgsIfExist();
    });

    viewports.forEach(viewport=>{
        context(`Testing the ${viewport} Version of the application`,()=>{
           it('Test Admin Elements',()=>{
            cy.get('@user_good').then(user => {
                cy.addUser(user).then(()=>{
                    cy.testAdminPageElements(viewport,user);
                });
            });
           });
           it('Test Admin Filter Users',()=>{
            cy.get('@user_good').then(user => {
                cy.addUser(user).then(()=>{
                    cy.testAdminFilterUsers(viewport,user);
               });
            });
           });
           it('Test Adding New Manager',()=>{
            cy.get('@user_good').then(user => {
                cy.addUser(user).then(()=>{
                    cy.get('@admin').then(admin=>{
                        cy.testAdminFilterAddNewManagerAction(viewport,user,admin);
                    });
                });
            });
           });
           it('Test Trash Bin Elements Empty',()=>{
               cy.get('@user_good').then(user =>{
                   cy.addUser(user).then(()=>{
                     //Clear deleted orgs and services
                     cy.setOrgsOrServicesDeletedState(Cypress.env('deleted_orgs_query_param'),false);
                     cy.setOrgsOrServicesDeletedState(Cypress.env('deleted_services_query_param'),false);
                     cy.testAdminTrashBinElements(viewport,user,'empty');
                    });
                   });
               });
           it('Test Trash Bin Elements Non Empty',()=>{
            cy.get('@user_good').then(user =>{
                cy.addUser(user).then(()=>{
                    cy.get('@organization_deleted').then((organization)=>{
                         cy.addOrg(organization).then(()=>{
                             cy.testAdminTrashBinElements(viewport,user,'non-empty');
                         });
                    });
                });
            });
        });
           it('Test Trash Bin View Deleted Organization',()=>{
            cy.get('@user_good').then(user =>{
                cy.addUser(user).then(()=>{
                    cy.get('@organization_deleted').then(organization=>{
                         cy.addOrg(organization).then((createdOrgResponse)=>{
                             cy.testAdminTrashBinViewOrganizationOrService(viewport,user,'Organization',createdOrgResponse.body.organization);
                         });
                    });
                });
            });
          });
          it('Test Trash Bin View Deleted Service Organization',()=>{
            cy.get('@user_good').then(user =>{
                cy.addUser(user).then(()=>{
                    cy.get('@organization_deleted').then(organization=>{
                         cy.addOrg(organization).then((createdOrgResponse)=>{
                             cy.testAdminTrashBinViewOrganizationOrService(viewport,user,'Service Organization',createdOrgResponse.body.organization);
                         });
                    });
                });
            });
          });
           it('Test Trash Bin Deleting Organizations',()=>{
            cy.get('@user_good').then(user =>{
                cy.addUser(user).then(()=>{
                    cy.get('@organization_deleted').then(organization=>{
                         cy.addOrg(organization).then(()=>{
                             cy.testAdminTrashBinDeleteOrRestoreOrganization(viewport,user,'Delete');
                         });
                    });
                });
            });
          });

          it('Test Trash Bin Restore Organizations',()=>{
            cy.get('@user_good').then(user =>{
                cy.addUser(user).then(()=>{
                    cy.get('@organization_deleted').then(organization=>{
                         cy.addOrg(organization).then(()=>{
                             cy.testAdminTrashBinDeleteOrRestoreOrganization(viewport,user,'Restore');
                         });
                    });
                });
            });
          });

          it('Test Trash Bin Deleting Services',()=>{
            cy.get('@user_good').then(user =>{
                cy.addUser(user).then(()=>{
                    cy.get('@organization_deleted').then(organization=>{
                         cy.addOrg(organization).then(()=>{
                             cy.testAdminTrashBinDeleteOrRestoreServices(viewport,user,'Delete');
                         });
                    });
                });
            });
          });

          it('Test Trash Bin Restoring Services',()=>{
            cy.get('@user_good').then(user =>{
                cy.addUser(user).then(()=>{
                    cy.get('@organization_deleted').then(organization=>{
                         cy.addOrg(organization).then(()=>{
                             cy.testAdminTrashBinDeleteOrRestoreServices(viewport,user,'Restore');
                         });
                    });
                });
            });
          });
        });
    });
});