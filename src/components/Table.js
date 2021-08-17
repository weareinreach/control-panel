/**
 * chakra-ui does not have a Table component just yet.
 * This thread hints that one is coming: https://github.com/chakra-ui/chakra-ui/issues/135
 * In the mean time this file is an extension of an example posted in the thread
 */
import PropTypes from 'prop-types';
import React from 'react';
import {Link} from 'react-router-dom';
import {Text} from '@chakra-ui/react';
import {css} from '@emotion/react';
import styled from '@emotion/styled';

const cellCSS = ({theme}) => css`
  text-align: left;
  font-weight: 400;
  vertical-align: middle;
  padding: ${theme.space[2]};

  &:first-of-type {
    padding-left: ${theme.space[4]};
  }

  &:last-child {
    padding-right: ${theme.space[4]};
  }
`;

const StyledTable = styled('table')`
  width: 100%;
  max-width: 100%;

  thead {
    th {
      ${cellCSS};
    }
  }

  tbody {
    tr:nth-of-type(odd) {
      background-color: ${({theme}) => theme.colors.blackAlpha[50]};
    }

    td {
      ${cellCSS};
    }
  }
`;

const ActioSpan = styled(Text)`
  margin-right: ${({theme}) => theme.space[4]};
  color: ${({theme}) => theme.colors.blue[500]};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Table = (props) => {
  const {actions, getRowLink, headers, hideHeaders, isKeyValue, rows} = props;

  return (
    <StyledTable data-test-id="table">
      {isKeyValue && (
        <colgroup>
          <col width="150" />
        </colgroup>
      )}
      {!hideHeaders && (
        <thead>
          <tr>
            {headers?.map(({key, label}) => (
              <th key={key} data-test-id="table-header">
                <Text data-test-id="table-header-text" color="gray.500" fontSize="md" fontWeight="bold">
                  {label}
                </Text>
              </th>
            ))}
            {actions && <th />}
          </tr>
        </thead>
      )}
      <tbody>
        {rows?.map((row, rowIndex) => {
          return (
            <tr key={rowIndex} data-test-id="table-row">
              {headers?.map(({key, getValue}, keyIndex) => {
                let value = row?.[key];

                if (getValue) {
                  value = getValue(row);
                } else if (value === true) {
                  value = 'YES';
                } else if (value === false) {
                  value = 'NO';
                }

                const children = <Text data-test-id="table-row-text" fontSize="md">{value}</Text>;

                return (
                  <td key={keyIndex}>
                    {getRowLink ? (
                      <Link to={getRowLink(row)}>{children}</Link>
                    ) : (
                      children
                    )}
                  </td>
                );
              })}
              {actions && (
                <td>
                  {actions?.map(({label, onClick}, index) => (
                    <ActioSpan
                      key={index}
                      as="span"
                      onClick={() => onClick(row)}
                    >
                      {label}
                    </ActioSpan>
                  ))}
                </td>
              )}
            </tr>
          );
        })}
      </tbody>
    </StyledTable>
  );
};

Table.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.shape()),
  getRowLink: PropTypes.func,
  headers: PropTypes.arrayOf(PropTypes.shape()),
  hideHeaders: PropTypes.bool,
  isKeyValue: PropTypes.bool,
  rows: PropTypes.arrayOf(PropTypes.shape()),
};

export default Table;

export const KeyValueTable = ({rows}) => (
  <Table headers={[{key: 'key'}, {key: 'value'}]} rows={rows} isKeyValue />
);

KeyValueTable.propTypes = {
  rows: Table.propTypes.rows,
};
