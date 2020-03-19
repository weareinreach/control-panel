import PropTypes from 'prop-types';
import React from 'react';
import {Helmet as ReactHelmet} from 'react-helmet';

const Helmet = props => {
  const {title} = props;

  return (
    <ReactHelmet>
      <title>
        {title}
        {title && ' | '}AsylumConnect Control Portal
      </title>
    </ReactHelmet>
  );
};

Helmet.propTypes = {
  title: PropTypes.string
};

export default Helmet;
