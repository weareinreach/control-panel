import React from 'react';
import DatePicker from 'react-datepicker';
import {FormControl} from '@chakra-ui/react';
import 'react-datepicker/dist/react-datepicker.css';
import '../date-picker.css';

const DateFieldPicker = ({onChange, selected, placeholderText}) => {
  return (
    <FormControl>
      <DatePicker
        placeholderText={placeholderText}
        showPopperArrow={true}
        selected={selected}
        onChange={onChange}
        isClearable={false}
      />
    </FormControl>
  );
};

export default DateFieldPicker;
