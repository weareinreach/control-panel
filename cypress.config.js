const {defineConfig} = require('cypress');

module.exports = defineConfig({
  //   integrationFolder: 'cypress/integration',
  video: false,
  chromeWebSecurity: false,
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    configFile: 'reporter-config.json',
  },
  // "reporter": "mochawesome",
  // "reporterOptions": {
  // 	"overwrite": false,
  // 	"html": true,
  // 	"json": true
  // },
  retries: {
    runMode: 3,
    openMode: 0,
  },
  defaultCommandTimeout: 10000,
  waitForAnimations: true,
  watchForFileChanges: false,
  projectId: 'mhd29m',
  e2e: {
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config);
      return config;
    },
    supportFile: 'cypress/support/index.js',
    specPattern: 'cypress/integration/**/*.js',
  },
});
