/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/// <reference types="cypress" />
//compound url

//Test Suite
describe('Admin Users Form Tests', () => {
  let viewports = [Cypress.env('desktop')];

  beforeEach(() => {
    cy.visit(Cypress.env('baseUrl'));
    cy.fixture('user_new.json').as('user_good');
    cy.fixture('organization.json').as('organization');
    cy.fixture('organization_deleted.json').as('organization_deleted');
    cy.fixture('admin_new.json').as('admin');
    cy.fixture('admin_data_manager.json').as('admin_data_manager');
  });
  afterEach(() => {
    cy.deleteUsersIfExist();
    cy.deleteOrgsIfExist();
  });

  viewports.forEach((viewport) => {
    context(`Testing the ${viewport} Version of the application`, () => {
      it('Test Admin Elements', () => {
        cy.get('@user_good').then((user) => {
          cy.addUser(user).then(() => {
            cy.testAdminPageElements(viewport, user);
          });
        });
      });
      it.only('Test Admin Filter Users', () => {
        cy.get('@user_good').then((user) => {
          cy.addUser(user).then(() => {
            cy.testAdminFilterUsers(viewport, user);
          });
        });
      });
      it('Test Adding New Manager', () => {
        cy.get('@user_good').then((user) => {
          cy.addUser(user).then(() => {
            cy.get('@admin').then((admin) => {
              cy.testAdminFilterAddNewManagerAction(viewport, user, admin);
            });
          });
        });
      });
      it('Test Adding View User Details', () => {
        cy.get('@user_good').then((user) => {
          cy.addUser(user).then(() => {
            cy.get('@admin').then((admin) => {
              cy.testAdminViewUserDetails(viewport, user, admin);
            });
          });
        });
      });
    });
  });
});
