import React from 'react';
import PropTypes from 'prop-types';

const InputField = ({ id, name, type, value, onChange, onBlur, touched, error, placeholder, className }) => {
    return (
        <div className="form-group">
            <input
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                className={`${className} ${touched && error ? 'is-invalid' : ''}`}
                placeholder={placeholder}
            />
            {touched && error && (
                <div className="text-danger mt-1" style={{ fontSize: '15px' }}>
                    {error}
                </div>
            )}
        </div>
    );
};

InputField.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    touched: PropTypes.bool,
    error: PropTypes.string,
    placeholder: PropTypes.string,
    className: PropTypes.string,
};

InputField.defaultProps = {
    touched: false,
    error: '',
    placeholder: '',
    className: 'form-control',
};

export default InputField;