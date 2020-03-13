import React from 'react';
import {Button, Menu, MenuButton, MenuItem, MenuList} from '@chakra-ui/core';

const DropdownButton = props => {
  const {buttonProps = {}, buttonText, items} = props;

  return (
    <Menu>
      <MenuButton
        as={Button}
        color="black"
        backgroundColor="gray.100"
        _hover={{bg: 'gray.200'}}
        rightIcon="chevron-down"
        {...buttonProps}
      >
        {buttonText}
      </MenuButton>
      <MenuList color="black">
        {items?.map(({onClick, text}, key) => (
          <MenuItem key={key} onClick={onClick}>
            {text}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default DropdownButton;
