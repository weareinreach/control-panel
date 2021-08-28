import PropTypes from 'prop-types';
import React from 'react';
import {
  Breadcrumb as ChakraBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Icon,
  Text,
} from '@chakra-ui/react';
import {FaChevronDown} from 'react-icons/fa';

const Breadcrumbs = (props) => {
  const {organization, service} = props;
  const hasService = service?.name;
  const textProps = {
    isTruncated: true,
    maxWidth: '200px',
  };

  return (
    <ChakraBreadcrumb
      marginBottom={4}
      spacing="8px"
      separator={<FaChevronDown />}
    >
      <BreadcrumbItem>
        <BreadcrumbLink data-test-id="bread-crumbs-link" href="/">
          <Text {...textProps} data-test-id="bread-crumbs-title">Organizations</Text>
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink
          href={`/organizations/${organization?._id}`}
          isCurrentPage={!hasService}
        >
          <Text {...textProps} data-test-id="bread-crumbs-organization-name">
            {organization?.name || 'Organization Name'}
          </Text>
        </BreadcrumbLink>
      </BreadcrumbItem>
      {hasService && (
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="#">
            <Text {...textProps} data-test-id="bread-crumbs-services-name">{service?.name || 'Service Name'}</Text>
          </BreadcrumbLink>
        </BreadcrumbItem>
      )}
    </ChakraBreadcrumb>
  );
};

Breadcrumbs.propTypes = {
  organization: PropTypes.shape(),
  service: PropTypes.shape(),
};

export default Breadcrumbs;
