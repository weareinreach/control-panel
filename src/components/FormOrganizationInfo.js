import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {Select} from '@chakra-ui/react';

const FormOrganizationInfo = (props) => {
  const {field, list, fieldValue: initialFieldValue, updateField} = props;
  const [fieldValue, setFieldValue] = useState(initialFieldValue);
  const handleSelect = (ev) => {
    const value = ev.target.value;

    updateField(field, value);
    setFieldValue(value);
  };

  return (
    <Select
      onChange={handleSelect}
      variant="filled"
      placeholder="Select an area"
      value={fieldValue}
    >
      <option value="">Remove Associated Value</option>
      {list?.map((item, index) => {
        const label = {
          location_id: item?.name || 'Location Name',
          schedule_id: item?.name || 'Schedule Name',
          email_id: item?.email || 'Email Address',
          phone_id: item?.phone_type || 'Phone Type',
        }[field];

        return (
          <option key={index} value={item._id}>
            {label}
          </option>
        );
      })}
    </Select>
  );
};

FormOrganizationInfo.propTypes = {
  field: PropTypes.string,
  fieldValue: PropTypes.string,
  list: PropTypes.arrayOf(PropTypes.shape({})),
  updateField: PropTypes.func,
};

export default FormOrganizationInfo;
