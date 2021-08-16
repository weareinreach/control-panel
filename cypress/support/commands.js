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
		url: compoundURL
	});
});

