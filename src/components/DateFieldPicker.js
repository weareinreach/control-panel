import React from 'react';
import DatePicker from 'react-datepicker';
import {FormControl} from '@chakra-ui/react';
import 'react-datepicker/dist/react-datepicker.css';
import '../date-picker.css';

const DateFieldPicker = ({
  disabled,
  maxDate,
  minDate,
  onChange,
  placeholderText,
  popperPlacement,
  selected,
}) => {
  return (
    <FormControl>
      <DatePicker
        disabled={disabled}
        isClearable={false}
        minDate={minDate}
        maxDate={maxDate}
        onChange={onChange}
        placeholderText={placeholderText}
        selected={selected}
        showPopperArrow={true}
        popperPlacement={popperPlacement}
      />
    </FormControl>
  );
};

export default DateFieldPicker;
