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
    });
	 //Save
	 cy.getElementByTestId('modal-save-button').click();
});

Cypress.Commands.add('addAddress',(organization)=>{
	//Add Address
    cy.getElementByTestId('organization-new-address-button').click();
    cy.getElementByTestId('name').then($element=>{
        cy.wrap($element.children()[1]).type(organization.locations[0].name);
    });
    cy.getElementByTestId('name_ES').then($element=>{
        cy.wrap($element.children()[1]).type(organization.locations[0].name_ES);
    });
    cy.getElementByTestId('unit').then($element=>{
        cy.wrap($element.children()[1]).type(organization.locations[0].unit);
    });
    cy.getElementByTestId('address').then($element=>{
        cy.wrap($element.children()[1]).type(organization.locations[0].address);
    });
    cy.getElementByTestId('city').then($element=>{
        cy.wrap($element.children()[1]).type(organization.locations[0].city);
    });
    cy.getElementByTestId('state').then($element=>{
        cy.wrap($element.children()[1]).type(organization.locations[0].state);
    });

    cy.getElementByTestId('country').then($element=>{
        cy.wrap($element.children()[1]).type(organization.locations[0].country);
    });
    cy.getElementByTestId('city_ES').then($element=>{
        cy.wrap($element.children()[1]).type(organization.locations[0].city_ES);
    });
    cy.getElementByTestId('state_ES').then($element=>{
        cy.wrap($element.children()[1]).type(organization.locations[0].state_ES);
    });
    cy.getElementByTestId('country_ES').then($element=>{
        cy.wrap($element.children()[1]).type(organization.locations[0].country_ES);
    });
    cy.getElementByTestId('zip_code').then($element=>{
        cy.wrap($element.children()[1]).type(organization.locations[0].zip_code);
    });
    cy.getElementByTestId('lat').then($element=>{
        cy.wrap($element.children()[1]).type(organization.locations[0].geolocation.coordinates[0]);
    });
    cy.getElementByTestId('long').then($element=>{
        cy.wrap($element.children()[1]).type(organization.locations[0].geolocation.coordinates[1]);
    });
    cy.getElementByTestId('is_primary').then($element=>{
        cy.wrap($element.children()[0]).click();
    });
    //Save
    cy.getElementByTestId('modal-save-button').click();
});


Cypress.Commands.add('addSchedule',(organization)=>{
	//Add Week Schedule
    cy.getElementByTestId('organization-new-schedule-button').click();
    cy.getElementByTestId('name').then($element=>{
        cy.wrap($element.children()[1]).type(organization.schedules[0].name);
    });
    cy.getElementByTestId('monday_start').then($element=>{
        cy.wrap($element.children()[1]).type(organization.schedules[0].monday_start);
    });
    cy.getElementByTestId('monday_end').then($element=>{
        cy.wrap($element.children()[1]).type(organization.schedules[0].monday_end);
    });
    cy.getElementByTestId('tuesday_start').then($element=>{
        cy.wrap($element.children()[1]).type(organization.schedules[0].tuesday_start);
    });
    cy.getElementByTestId('tuesday_end').then($element=>{
        cy.wrap($element.children()[1]).type(organization.schedules[0].tuesday_end);
    });
    cy.getElementByTestId('wednesday_start').then($element=>{
        cy.wrap($element.children()[1]).type(organization.schedules[0].wednesday_start);
    });
    cy.getElementByTestId('wednesday_end').then($element=>{
        cy.wrap($element.children()[1]).type(organization.schedules[0].wednesday_end);
    });
    cy.getElementByTestId('thursday_start').then($element=>{
        cy.wrap($element.children()[1]).type(organization.schedules[0].thursday_start);
    });
    cy.getElementByTestId('thursday_end').then($element=>{
        cy.wrap($element.children()[1]).type(organization.schedules[0].thursday_end);
    });
    cy.getElementByTestId('friday_start').then($element=>{
        cy.wrap($element.children()[1]).type(organization.schedules[0].friday_start);
    });
    cy.getElementByTestId('friday_end').then($element=>{
        cy.wrap($element.children()[1]).type(organization.schedules[0].friday_end);
    });

    cy.getElementByTestId('timezone').then($element=>{
        cy.wrap($element.children().children()[0]).select(organization.schedules[0].timezone);
    });

    cy.getElementByTestId('note').then($element=>{
        cy.wrap($element.children()[1]).type(organization.schedules[0].note);
    });
    //save
    cy.getElementByTestId('modal-save-button').click();
});

Cypress.Commands.add('addEmail',(organization)=>{
	//Add Email
    cy.getElementByTestId('organization-new-email-button').click();
    cy.getElementByTestId('email').then($element=>{
        cy.wrap($element.children()[1]).type(organization.emails[0].email);
    });
    cy.getElementByTestId('title').then($element=>{
        cy.wrap($element.children()[1]).type(organization.emails[0].title);
    });
    cy.getElementByTestId('title_ES').then($element=>{
        cy.wrap($element.children()[1]).type(organization.emails[0].email);
    });
    cy.getElementByTestId('first_name').then($element=>{
        cy.wrap($element.children()[1]).type(organization.emails[0].first_name);
    });
    cy.getElementByTestId('last_name').then($element=>{
        cy.wrap($element.children()[1]).type(organization.emails[0].last_name);
    });
    cy.getElementByTestId('is_primary').then($element=>{
        cy.wrap($element.children()[0]).click();
    });
    //Save
    cy.getElementByTestId('modal-save-button').click();
});

Cypress.Commands.add('addPhone',(organization)=>{
	//Add Phone
    cy.getElementByTestId('organization-new-phone-button').click();
    cy.getElementByTestId('phone_type').then($element=>{
        cy.wrap($element.children()[1]).type(organization.phones[0].phone_type);
    });
    cy.getElementByTestId('phone_type_ES').then($element=>{
        cy.wrap($element.children()[1]).type(organization.phones[0].phone_type_ES);
    });
    cy.getElementByTestId('digits').then($element=>{
        cy.wrap($element.children()[1]).type(organization.phones[0].digits);
    });
    cy.getElementByTestId('is_primary').then($element=>{
        cy.wrap($element.children()[0]).click();
    });
    //Save
    cy.getElementByTestId('modal-save-button').click();
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
			// eslint-disable-next-line default-case
			switch(user.email){
                case 'automation@gmail.com':
                case 'automation-updated@gmail.com':
                case 'automation-1@gmail.com':
                case 'automation-data@gmail.com':
                case 'automation-owner@gmail.com':
                    cy.deleteUser(user._id);
                break;
            }
        })})});
           

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


//Add Org
Cypress.Commands.add('addOrg', (org) => {
	compoundURL = Cypress.env('apiUrl').concat(
		Cypress.env('version'),
		Cypress.env('route_organizations')
	);
	cy.request({
		method: 'POST',
		url: compoundURL,
		body: org
	});
});

//Update Org
Cypress.Commands.add('updateOrg', (org) => {
    cy.log(org)
	compoundURL = Cypress.env('apiUrl').concat(
		Cypress.env('version'),
		Cypress.env('route_organizations'),
        `/${org._id}`
	);
	cy.request({
		method: 'PATCH',
		url: compoundURL,
		body: org
	});
});


Cypress.Commands.add('setOrgsOrServicesDeletedState',(query,state)=>{
    //Get Orgs Or Services that are marked deleted
    compoundURL = Cypress.env('apiUrl').concat(
        Cypress.env('version'),
        Cypress.env('route_organizations'),
        query
    );
    cy.request({
        method: 'GET',
        url: compoundURL
    }).then(response =>{
        //Only act if there are organizations
        if(response.body.organizations.length > 0){
            response.body.organizations.forEach(org =>{
                let updatedOrg = org;
                switch(query){
                    case Cypress.env('deleted_orgs_query_param'):
                        //Org is deleted set to state
                        updatedOrg.is_deleted = state;
                    break;
                    case Cypress.env('deleted_services_query_param'):
                        //Org services is deleted set to state
                        updatedOrg.services.forEach(service =>{
                            service.is_deleted = state;
                        });
                    break;
                    default:
                        throw new Error(`Only accept query as: ${Cypress.env('deleted_orgs_query_param')} or ${Cypress.env('deleted_services_query_param')} as variables`);

                }
                cy.updateOrg(updatedOrg);
            });
        }
    })

});

Cypress.Commands.add('createOwnerObject',(user)=>{
    return {
        isApproved:false,
        userId:user._id,
        email:user.email
    }
});


