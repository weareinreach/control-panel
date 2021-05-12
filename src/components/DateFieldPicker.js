import React from 'react';
import DatePicker from 'react-datepicker';
import { FormControl } from '@chakra-ui/core';
import 'react-datepicker/dist/react-datepicker.css';
import '../date-picker.css';


const DateFieldPicker = ({ onChange, selected }) => {
  return (
    <FormControl>
        <DatePicker 
          showPopperArrow={true}
          selected={selected}
          onChange={onChange}
          isClearable={true}
        />
    </FormControl> 
  );
}

export default DateFieldPicker;