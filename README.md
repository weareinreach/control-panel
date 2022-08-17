# Asylum Connect Control Panel

[![Build Status](https://travis-ci.org/asylum-connect/control-panel.svg?branch=master)](https://travis-ci.org/asylum-connect/control-panel)

## Development

```
$ cd to admin-control-panel

$ npm i

$ npm start
```

## Codebase

Folder structure

```
admin-control-panel/
├── public          # Static assets
├── src             # All of the source code for the app
├── src/components  # React components used throughout the app
├── src/data        # Config like JSON data for properties, fields, etc
├── src/pages       # App's pages
├── src/utils       # Shared utilities
└── src/server.js   # Express server used to serve the app in production
```

Technologies

- [create-react-app](https://create-react-app.dev/)
- [React](https://reactjs.org/)
- [React-Router](https://reacttraining.com/react-router/)
- [Chakra-UI](https://chakra-ui.com/)
- [Formik](https://jaredpalmer.com/formik/)
- [Express](https://expressjs.com/)

Code Standards

In order to enforce code standards we use [eslint](https://eslint.org/) and [prettier](https://prettier.io/). Setting up eslint in your code editor is the easiest way to adhere to guidlines while programming but we also lint and prettify code during the commit process using [lint-staged](https://github.com/okonet/lint-staged).

## For Mac Users
 
Connecting to the local DB

If you are trying to connect to your local, you may need to change the local script on the package.json to 'REACT_APP_APP_ENV=TEST npm run start'
