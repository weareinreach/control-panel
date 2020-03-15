import React from 'react';
import {render, fireEvent} from '@testing-library/react';

import {useInputChange, useToggle} from '../hooks';

describe('useInputChange', () => {
  const Input = () => {
    const [value, onChange] = useInputChange();

    return <input placeholder="input" onChange={onChange} value={value} />;
  };

  it('should handle input change and set the value', () => {
    const {getByPlaceholderText} = render(<Input />);
    const input = getByPlaceholderText('input');

    fireEvent.change(input, {target: {value: 'a'}});

    expect(input.value).toBe('a');
  });
});

describe('useToggle', () => {
  const Toggle = () => {
    const [show, toggleShow] = useToggle();

    return <button onClick={toggleShow}>{show ? 'show' : 'hide'}</button>;
  };

  it('should correctly toggle true/false', () => {
    const {getByText, queryByText} = render(<Toggle />);

    expect(queryByText('show')).not.toBeInTheDocument();

    fireEvent.click(getByText('hide'));

    expect(queryByText('hide')).not.toBeInTheDocument();

    fireEvent.click(getByText('show'));

    expect(queryByText('show')).not.toBeInTheDocument();
  });
});
