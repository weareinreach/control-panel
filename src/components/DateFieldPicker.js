import React from 'react';
import DatePicker from 'react-datepicker';
import {
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  Select,
  Text,
  Textarea,
  Tooltip,
} from '@chakra-ui/core';
import 'react-datepicker/dist/react-datepicker.css';
import '../date-picker.css';


const DateFieldPicker = ({ onChange, selected, onSelect }) => {
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