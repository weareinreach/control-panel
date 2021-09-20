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
            it('Testing Organization Service Elements',()=>{
                cy.get('@user_good').then(user=>{
                    cy.addUser(user).then(()=>{
                        cy.get('@organization').then(org=>{
                            cy.testingOrganizationServicesElements(viewport,user,org);
                        });
                    });
                });
            });
            it('Testing Organization Service Details',()=>{
                cy.get('@user_good').then(user=>{
                    cy.addUser(user).then(()=>{
                        cy.get('@organization').then(org=>{
                            cy.testAddingOrganizationServicesDetails(viewport,user,org);
                        });
                    });
                });
            });
            it('Testing Organization Service New Access Information',()=>{
                cy.get('@user_good').then(user=>{
                    cy.addUser(user).then(()=>{
                        cy.get('@organization').then(org=>{
                            cy.testAddingOrganizationServiceAccessInformation(viewport,user,org);
                        });
                    });
                });
            });
            it('Testing Organization Service New Address',()=>{
                cy.get('@user_good').then(user=>{
                    cy.addUser(user).then(()=>{
                        cy.get('@organization').then(org=>{
                            cy.testAddingOrganizationServiceAddress(viewport,user,org);
                        });
                    });
                });
            });

            it('Testing Organization Service New Schedule',()=>{
                cy.get('@user_good').then(user=>{
                    cy.addUser(user).then(()=>{
                        cy.get('@organization').then(org=>{
                            cy.testAddingOrganizationServiceSchedule(viewport,user,org);
                        });
                    });
                });
            });

            it('Testing Organization Service New Email',()=>{
                cy.get('@user_good').then(user=>{
                    cy.addUser(user).then(()=>{
                        cy.get('@organization').then(org=>{
                            cy.testAddingOrganizationServiceEmails(viewport,user,org);
                        });
                    });
                });
            });

            it('Testing Organization Service New Phone',()=>{
                cy.get('@user_good').then(user=>{
                    cy.addUser(user).then(()=>{
                        cy.get('@organization').then(org=>{
                            cy.testAddingOrganizationServicePhone(viewport,user,org);
                        });
                    });
                });
            });

            it('Testing Organization Service Edit Coverage',()=>{
                cy.get('@user_good').then(user=>{
                    cy.addUser(user).then(()=>{
                        cy.get('@organization').then(org=>{
                            cy.testAddingOrganizationServiceEditCoverage(viewport,user,org);
                        });
                    });
                });
            });
            it('Testing Organization Service Notes',()=>{
                cy.get('@user_good').then(user=>{
                    cy.addUser(user).then(()=>{
                        cy.get('@organization').then(org=>{
                            cy.testAddingOrganizationServicesNotes(viewport,user,org);
                        });
                    });
                });
            });
        });
    });
});