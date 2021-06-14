import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {CSSReset, ChakraProvider} from '@chakra-ui/react';

import {ContextAppProvider} from './components/ContextApp';
import {ContextFormModalProvider} from './components/ContextFormModal';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import Routes from './components/Routes';

const App = () => {
  return (
    <ChakraProvider>
      <CSSReset />
      <ErrorBoundary>
        <ContextAppProvider>
          <ContextFormModalProvider>
            <Router>
              <Header />
              <Routes />
            </Router>
          </ContextFormModalProvider>
        </ContextAppProvider>
      </ErrorBoundary>
    </ChakraProvider>
  );
};

export default App;
