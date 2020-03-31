import PropTypes from 'prop-types';
import React from 'react';
import {
  Breadcrumb as ChakraBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Icon,
  Text,
} from '@chakra-ui/core';

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
      separator={<Icon color="gray.300" name="chevron-right" />}
    >
      <BreadcrumbItem>
        <BreadcrumbLink href="/">
          <Text {...textProps}>Organizations</Text>
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink
          href={`/organizations/${organization?._id}`}
          isCurrentPage={!hasService}
        >
          <Text {...textProps}>
            {organization?.name || 'Organization Name'}
          </Text>
        </BreadcrumbLink>
      </BreadcrumbItem>
      {hasService && (
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="#">
            <Text {...textProps}>{service?.name || 'Service Name'}</Text>
          </BreadcrumbLink>
        </BreadcrumbItem>
      )}
    </ChakraBreadcrumb>
  );
};

Breadcrumbs.propTypes = {
  // description: PropTypes.string,
  // title: PropTypes.string,
  // type: PropTypes.string,
};

export default Breadcrumbs;
