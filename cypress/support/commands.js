// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('getElementByTestId',(id_name =>{
    return cy.get(`[data-test-id=${id_name}]`);
}));

Cypress.Commands.add('login',(username,password)=>{
    cy.getElementByTestId('login-form-email-input').type(username);
    cy.getElementByTestId('login-form-password-input').type(password);
    cy.getElementByTestId('login-form-submit-button').click();
	 //Waiting for Response
	 cy.intercept('/v1/organizations/**').then(()=>{
		 cy.wait(1000);
	 });
});

Cypress.Commands.add('addOrganization',(organization)=>{
	cy.getElementByTestId('organization-new-button').click();
    //Add Org
    cy.getElementByTestId('name').then($element=>{
        cy.wrap($element.children()[1]).type(organization.name);
        cy.getElementByTestId('modal-save-button').click();
    });
});

Cypress.Commands.add('addService',(organization)=>{
	//Add Service
    cy.getElementByTestId('organization-new-service-button').click();
    cy.getElementByTestId('name').then($element=>{
        cy.wrap($element.children()[1]).type(organization.services[0].name);
        //Save
        cy.getElementByTestId('modal-save-button').click();
    });
});

// -------------- User Commands -----------------
let compoundURL = null;

//Add User
Cypress.Commands.add('addUser', (user_data) => {
	compoundURL = Cypress.env('apiUrl').concat(
		Cypress.env('version'),
		Cypress.env('route_users')
	);
	cy.request({
		method: 'POST',
		url: compoundURL,
		body: user_data
	});
});

Cypress.Commands.add('deleteUsersIfExist', () => {
	cy.log('Cleaning Users...');
	compoundURL = Cypress.env('apiUrl').concat(
		Cypress.env('version'),
		Cypress.env('route_users')
	);
	cy.request({
		method: 'GET',
		url: compoundURL
	}).then((response) => {
		let usersArray = response.body.users;
		usersArray.forEach((user) => {
			//Regular User
			if (
				user.email === 'automation@gmail.com' ||
				user.email === 'automation-updated@gmail.com'
			) {
				cy.deleteUser(user._id);
			}
		});
	});
});

//Delete User
Cypress.Commands.add('deleteUser', (user_id) => {
	compoundURL = Cypress.env('apiUrl').concat(
		Cypress.env('version'),
		Cypress.env('route_users'),
		`/${user_id}`
	);
	cy.request({
		method: 'DELETE',
		url: compoundURL,
		failOnStatusCode:false
	});
});

// ------------ Organization Commands ------------------
//Organizations
Cypress.Commands.add('deleteOrgsIfExist', () => {
	cy.log('Cleaning Orgs...');
	compoundURL = Cypress.env('apiUrl').concat(
		Cypress.env('version'),
		Cypress.env('route_slug_organizations'),
		'/surprisingly-unique-org-name'
	);
	cy.request({
		method: 'GET',
		url: compoundURL,
		failOnStatusCode: false
	}).then((response) => {
		if (!response.body.notFound) {
			cy.deleteOrgById(response.body._id);
		}
	});
});


//Delete Org by ID
Cypress.Commands.add('deleteOrgById', (id) => {
	compoundURL = Cypress.env('apiUrl').concat(
		Cypress.env('version'),
		Cypress.env('route_organizations'),
		`/${id}`
	);
	cy.request({
		method: 'DELETE',
		url: compoundURL,
		failOnStatusCode:false
	});
});
