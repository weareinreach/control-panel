import PropTypes from 'prop-types';
import React, {createContext, useState} from 'react';

import FormModal from './FormModal';

export const ContextFormModal = createContext('forms');

export const ContextFormModalProvider = (props) => {
  const [showModal, setShowModel] = useState(false);
  const [formProps, setFormProps] = useState({});
  const openModal = (newProps) => {
    setShowModel(true);
    setFormProps(newProps);
  };
  const closeModal = () => {
    setShowModel(false);
    setFormProps({});
  };
  const value = {closeModal, openModal};

  return (
    <ContextFormModal.Provider value={value}>
      {props.children}
      {showModal && <FormModal {...formProps} isOpen />}
    </ContextFormModal.Provider>
  );
};

ContextFormModalProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
