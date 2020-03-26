import React from 'react';

import MessagePage from '../components/MessagePage';

const UnauthorizedPage = () => (
  <MessagePage
    title="Unauthorized"
    message="You don't have permission to view this page."
  />
);

export default UnauthorizedPage;
