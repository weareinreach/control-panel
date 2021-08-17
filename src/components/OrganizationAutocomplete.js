import React from 'react';
import PropTypes from 'prop-types';

import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';

const OrganizationAutocomplete = (props) => {
  const {
    setOrgSelection,
    setOrgQuery,
    onOrgFetchRequested,
    onQueryClearRequested,
    handleBlurOrganizations,
    organizations,
    orgSelection,
    orgQuery

  } = props;
  const getSuggestionValue = (suggestion) => suggestion.name;
  const renderSuggestion = (suggestion, {orgQuery, isHighlighted}) => {
    const matches = match(suggestion.name, orgQuery);
    const parts = parse(suggestion.name, matches);
    return (
      <div selected={isHighlighted}>
        <div>
          {parts.map((part, index) => {
            return part.highlight ? (
              <span key={index} style={{fontWeight: 300}}>
                {part.text}
              </span>
            ) : (
              <strong key={index} style={{fontWeight: 500}}>
                {part.text}
              </strong>
            );
          })}
        </div>
      </div>
    );
  };
  const inputStyles = {
    container: {
      flex: 1,
      position: 'relative',
      zIndex: 1,
      marginBottom: '1rem'
    },
    suggestionsContainerOpen: {
      border: 'solid 1px #edf2f7',
      padding: '8px 16px',
    },
    suggestion: {
      display: 'block',
    },
    suggestionsList: {
      listStyleType: 'none',
    },
    input: {
      width: '100%',
      background:'#edf2f7',
      padding: '8px 16px',
      borderRadius: '4px',
      '&:hover': {
        background: '#e2e8f0'
      }
    },
    inputFocused: {
      background:'#ffffff',
    }
  }
  const inputProps = {
    placeholder: 'Start typing...',
    value: orgQuery || (orgSelection && orgSelection.name ? orgSelection.name : ''),
    onChange: setOrgQuery,
  };
  return (
      <Autosuggest
        inputProps={inputProps}
        suggestions={organizations}
        renderSuggestion={renderSuggestion}
        getSuggestionValue={getSuggestionValue}
        onSuggestionSelected={setOrgSelection}
        onSuggestionsFetchRequested={onOrgFetchRequested}
        onSuggestionsClearRequested={onQueryClearRequested}
        focusInputOnSuggestionClick={false}
        theme={{
          container: inputStyles.container,
          suggestionsContainerOpen: inputStyles.suggestionsContainerOpen,
          suggestionsList: inputStyles.suggestionsList,
          suggestion: inputStyles.suggestion,
          input: inputStyles.input,
          inputFocused: inputStyles.inputFocused
        }}
      />
  );
};

OrganizationAutocomplete.propTypes = {};

export default OrganizationAutocomplete;
