/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/// <reference types="cypress" />

//compound url

//Test Suite
describe('Organization Form Tests', () => {

    let viewports = [Cypress.env('desktop'),Cypress.env('tablet'),Cypress.env('mobile')];

    beforeEach(() => {
        cy.visit(Cypress.env('baseUrl'));
        cy.fixture('user_new.json').as('user_good');
        cy.fixture('organization.json').as('organization');
    });
    afterEach(() => {
        cy.deleteUsersIfExist();
        cy.deleteOrgsIfExist();
    });

    viewports.forEach(viewport=>{
        context(`Testing the ${viewport} Version of the application`,()=>{
            it('Testing Organization Page General Elements',()=>{
                cy.get('@user_good').then(user=>{
                    cy.addUser(user).then(()=>{
                        cy.testOrganizationDetailsGeneralElements(viewport,user);
                    });
                });
            }); 
            it('Testing Organization Page Photo Elements',()=>{
                cy.get('@user_good').then(user=>{
                    cy.addUser(user).then(()=>{
                        cy.testOrganizationDetailsPhotosElements(viewport,user);
                    });
                });
            }); 
            it('Testing Adding Organization',()=>{
                cy.get('@user_good').then(user=>{
                    cy.addUser(user).then(()=>{
                       cy.get('@organization').then(org=>{
                            cy.testAddingOrganizationAction(viewport,user,org);
                        });
                    });
                }); 
            });
            it('Testing Adding Organization Services',()=>{
                cy.get('@user_good').then(user=>{
                    cy.addUser(user).then(()=>{
                       cy.get('@organization').then(org=>{
                            cy.testAddingOrganizationServices(viewport,user,org);
                        });
                    });
                }); 
            });
            it('Testing Adding Organization Addresses',()=>{
                cy.get('@user_good').then(user=>{
                    cy.addUser(user).then(()=>{
                       cy.get('@organization').then(org=>{
                            cy.testAddingOrganizationAddresses(viewport,user,org);
                        });
                    });
                }); 
            }); 
            it('Testing Adding Organization Schedules',()=>{
                cy.get('@user_good').then(user=>{
                   cy.addUser(user).then(()=>{
                       cy.get('@organization').then(org=>{
                            cy.testAddingOrganizationSchedules(viewport,user,org);
                        });
                    });
                }); 
            }); 
            it('Testing Adding Organization Email Addresses',()=>{
                cy.get('@user_good').then(user=>{
                   cy.addUser(user).then(()=>{
                       cy.get('@organization').then(org=>{
                            cy.testAddingOrganizationEmail(viewport,user,org);
                        });
                    });
                }); 
            });
            it('Testing Adding Organization Phones',()=>{
                cy.get('@user_good').then(user=>{
                   cy.addUser(user).then(()=>{
                       cy.get('@organization').then(org=>{
                            cy.testAddingOrganizationPhone(viewport,user,org);
                        });
                    });
                }); 
            });
            it('Testing Adding Social Media',()=>{
                cy.get('@user_good').then(user=>{
                    cy.addUser(user).then(()=>{
                        cy.get('@organization').then(org=>{
                             cy.testAddingOrganizationSocialMedia(viewport,user,org);
                         });
                     });
                 });
            }); 
        });
    });
});