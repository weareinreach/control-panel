import React from 'react';
import DatePicker from 'react-datepicker';
import {FormControl} from '@chakra-ui/react';
import 'react-datepicker/dist/react-datepicker.css';
import '../date-picker.css';

const DateFieldPicker = ({
  onChange,
  selected,
  placeholderText,
  minDate,
  maxDate,
  required,
  disabled,
}) => {
  return (
    <FormControl>
      <DatePicker
        disabled={disabled}
        required={required}
        minDate={minDate}
        maxDate={maxDate}
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
