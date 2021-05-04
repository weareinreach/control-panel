/* eslint-disable no-undef */
/// <reference types="cypress" />

//compound url
let compoundURL = null;

//Test Suite
describe('Test',()=>{
    it('test',()=>{
        compoundURL = Cypress.env('baseUrl').concat(Cypress.env('route_login'));
        cy.request({
            method:'GET',
            url:compoundURL
        }).should(response =>{
            expect(response.status).to.be.eq(200);
        });
    });
});