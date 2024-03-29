// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';
import '@cypress/code-coverage/support';
import './reusable_tests/login_page';
import './reusable_tests/header';
import './reusable_tests/dashboard';
import './reusable_tests/stats';
import './reusable_tests/admin_users';
import './reusable_tests/admin_suggestions';
import './reusable_tests/admin_trash_bin';
import './reusable_tests/organization';
import './reusable_tests/service';
import './reusable_tests/properties';
import './reusable_tests/tags';

// Alternatively you can use CommonJS syntax:
// require('./commands')
