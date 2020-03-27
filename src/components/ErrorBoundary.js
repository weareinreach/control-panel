import PropTypes from 'prop-types';
import React, {Component} from 'react';

import MessagePage from './MessagePage';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {hasError: false};
  }

  static getDerivedStateFromError(error) {
    return {hasError: true};
  }

  componentDidCatch(error, errorInfo) {
    console.error('componentDidCatch');
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <MessagePage title="Uh Oh." message="Something went wrong." />;
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
