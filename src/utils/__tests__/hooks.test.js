import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { useInputChange, useStatus, useToggle } from '../hooks';

describe('useInputChange', () => {
  const Input = () => {
    const [value, onChange] = useInputChange();

    return <input placeholder="input" onChange={onChange} value={value} />;
  };

  it('should handle input change and set the value', () => {
    const { getByPlaceholderText } = render(<Input />);
    const input = getByPlaceholderText('input');

    fireEvent.change(input, { target: { value: 'a' } });

    expect(input.value).toBe('a');
  });
});

describe('useInputChange', () => {
  const Input = () => {
    const [value, onChange] = useInputChange();

    return <input placeholder="input" onChange={onChange} value={value} />;
  };

  it('should handle input change and set the value', () => {
    const { getByPlaceholderText } = render(<Input />);
    const input = getByPlaceholderText('input');

    fireEvent.change(input, { target: { value: 'a' } });

    expect(input.value).toBe('a');
  });
});

describe('useStatus', () => {
  const Status = () => {
    const { isError,
      isLoading,
      isSuccess,
      setError,
      setLoading,
      setSuccess,
    } = useStatus();
    let statusComponent = null;

    if (isError) {
      statusComponent = <p>isError</p>
    }
    if (isLoading) {
      statusComponent = <p>isLoading</p>
    }
    if (isSuccess) {
      statusComponent = <p>isSuccess</p>
    }


    return (
      <div>
        {statusComponent}
        <button onClick={setError}>setError</button>
        <button onClick={setLoading}>setLoading</button>
        <button onClick={setSuccess}>setSuccess</button>
      </div>
    );
  };

  it('should correctly toggle true/false', () => {
    const { getByText, queryByText } = render(<Status />);

    expect(queryByText('isError')).not.toBeInTheDocument();
    expect(queryByText('isLoading')).not.toBeInTheDocument();
    expect(queryByText('isSuccess')).not.toBeInTheDocument();

    fireEvent.click(getByText('setError'));

    expect(queryByText('isError')).toBeInTheDocument();
    expect(queryByText('isLoading')).not.toBeInTheDocument();
    expect(queryByText('isSuccess')).not.toBeInTheDocument();

    fireEvent.click(getByText('setLoading'));

    expect(queryByText('isLoading')).toBeInTheDocument();
    expect(queryByText('isError')).not.toBeInTheDocument();
    expect(queryByText('isSuccess')).not.toBeInTheDocument();

    fireEvent.click(getByText('setSuccess'));

    expect(queryByText('isSuccess')).toBeInTheDocument();
    expect(queryByText('isError')).not.toBeInTheDocument();
    expect(queryByText('isLoading')).not.toBeInTheDocument();
  });
});

describe('useToggle', () => {
  const Toggle = () => {
    const [show, toggleShow] = useToggle();

    return <button onClick={toggleShow}>{show ? 'show' : 'hide'}</button>;
  };

  it('should correctly toggle true/false', () => {
    const { getByText, queryByText } = render(<Toggle />);

    expect(queryByText('show')).not.toBeInTheDocument();

    fireEvent.click(getByText('hide'));

    expect(queryByText('hide')).not.toBeInTheDocument();

    fireEvent.click(getByText('show'));

    expect(queryByText('show')).not.toBeInTheDocument();
  });
});
