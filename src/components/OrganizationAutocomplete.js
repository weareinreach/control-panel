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
    orgQuery,
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
  const inputProps = {
    placeholder: 'Start typing...',
    value: orgQuery || (orgSelection && orgSelection.name ? orgSelection.name : ''),
    onChange: setOrgQuery,
    onBlur: handleBlurOrganizations
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
      />
  );
};

OrganizationAutocomplete.propTypes = {};

export default OrganizationAutocomplete;
