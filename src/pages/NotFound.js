import React from 'react';

import Helmet from '../components/Helmet';
import MessagePage from '../components/MessagePage';

const title = 'Not Found';

const NotFound = () => (
  <>
    <Helmet title={title} />
    <MessagePage
      title={title}
      message="This page could not be found. Please return home."
    />
  </>
);

export default NotFound;
