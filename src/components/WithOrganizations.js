import React, {Component} from 'react';
import {get} from 'axios';
import {CATALOG_API_URL} from '../utils/index';
import {debounce} from 'lodash';

const withOrganizations = (WrappedComponent) => {
  class withOrganizations extends Component {
    constructor(props) {
      super(props);
      this.state = {
        organizations: [],
        orgSelection: '',
        orgQuery: '',
      };
    }
    handleBlurOrganizations = (event) => {
      this.setState((prevState) =>
        Object.assign(
          {},
          {organizations: []},
          {
            orgQuery: prevState.orgSelection ? prevState.orgSelection.name : '',
          }
        )
      );
    };

    setOrgQuery = (e, {newValue}) => {
      this.setState((prevState) => ({...prevState, orgQuery: newValue}));
    };
    setOrgSelection = (e, {suggestion, suggestionValue}) => {
      this.setState({
        organizations: [],
        orgQuery: suggestionValue || '',
        orgSelection: suggestion,
      });
    };
    loadOrganizations = async () => {
      if (this.state.orgQuery) {
        const url = `${CATALOG_API_URL}/organizations/name/${this.state.orgQuery}`;
        const {data} = await get(url);
        this.setState((prevState) => ({
          ...prevState,
          organizations: data.organizations || [],
        }));
      }
    };
    onOrgFetchRequested = debounce(() => {
      this.setState((prevState) => ({...prevState, orgSelection: null}));
      this.loadOrganizations();
    }, 200);
    onQueryClearRequested = () => {
      this.setState((prevState) => ({
        ...prevState,
        organizations: [],
      }));
    };
    render() {
      return (
        <WrappedComponent
          setOrgSelection={this.setOrgSelection}
          setOrgQuery={this.setOrgQuery}
          onOrgFetchRequested={this.onOrgFetchRequested}
          onQueryClearRequested={this.onQueryClearRequested}
          handleBlurOrganizations={this.handleBlurOrganizations}
          {...this.props}
          {...this.state}
        />
      );
    }
  }
  return withOrganizations;
};

export default withOrganizations;
