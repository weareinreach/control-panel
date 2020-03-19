import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {CSSReset, ThemeProvider} from '@chakra-ui/core';

import {ContextAppProvider} from './components/ContextApp';
import {ContextFormModalProvider} from './components/ContextFormModal';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import Routes from './components/Routes';

const App = () => {
  return (
    <ThemeProvider>
      <CSSReset />
      <ErrorBoundary>
        <ContextAppProvider>
          <ContextFormModalProvider>
            <Router forceRefresh={true}>
              <Header />
              <Routes />
            </Router>
          </ContextFormModalProvider>
        </ContextAppProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;
