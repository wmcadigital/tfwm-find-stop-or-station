/* eslint-disable jsx-a11y/no-onchange */
import dompurify from 'dompurify';
// Import contexts
import React from 'react';

const { sanitize } = dompurify;

type DropdownProps = {
  name: string;
  error: { message: string } | null;
  label: string;
  defaultValue?: string | null;
  options: any[];
  onChange?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
};

const Dropdown = ({
  name,
  label,
  error,
  options,
  defaultValue,
  onChange,
  onBlur,
}: DropdownProps) => {
  return (
    <div className="wmnds-fe-group wmnds-m-b-md">
      <div className={`wmnds-fe-dropdown${error ? ' wmnds-fe-group--error' : ''}`}>
        {/* If there is an error, show here */}
        {error && (
          <span
            className="wmnds-fe-error-message"
            dangerouslySetInnerHTML={{
              __html: sanitize(error.message),
            }}
          />
        )}
        <label className="wmnds-fe-label" htmlFor={name}>
          <span className="wmnds-h4 wmnds-m-none">{label}</span>
        </label>
        <select
          className="wmnds-fe-dropdown__select"
          id={name}
          name={name}
          defaultValue={defaultValue || ''}
          onChange={onChange}
          onBlur={onBlur}
        >
          <option value="">Choose from list</option>
          {options.map((option) => (
            <option key={option.text} value={option.value} selected={option.value === defaultValue}>
              {option.text}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Dropdown;
