import PropTypes from 'prop-types';
import React from 'react';
import {Button, Menu, MenuButton, MenuItem, MenuList} from '@chakra-ui/react';
import {FaChevronDown} from 'react-icons/fa';
const DropdownButton = (props) => {
  const {buttonProps = {}, listProps = {}, buttonText, items} = props;

  return (
    <Menu>
      <MenuButton
        as={Button}
        color="black"
        marginLeft="5px"
        marginRight="5px"
        backgroundColor="gray.100"
        _hover={{bg: 'gray.200'}}
        rightIcon={<FaChevronDown/>}
        {...buttonProps}
      >
        {buttonText}
      </MenuButton>
      <MenuList color="black" {...listProps}>
        {items?.map(({onClick, href, text}, key) => {
          const itemProps = href ? {as: 'a', href, target: '_blank'} : {onClick};
          return (
            <MenuItem key={key} {...itemProps}>
              {text}
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
};

DropdownButton.propTypes = {
  buttonProps: PropTypes.shape(),
  buttonText: PropTypes.string,
  listProps: PropTypes.shape(),
  items: PropTypes.arrayOf(PropTypes.shape()),
};

export default DropdownButton;
