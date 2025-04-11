import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../assets/css/auth/authentication.module.css'

const EmailField = ({
    id,
    name,
    label,
    value,
    onChange,
    onBlur,
    touched,
    error,
    placeholder,
    className,
}) => {
    return (
        <div className="form-group">
            <label htmlFor={id} className={`form-label fw-semibold ${styles['label']}`}>
                {label}
            </label>
            <input
                type="email"
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                className={`form-control py-3 ${touched && error ? 'is-invalid' : ''} ${className}`}
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

EmailField.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    touched: PropTypes.bool,
    error: PropTypes.string,
    placeholder: PropTypes.string,
    className: PropTypes.string,
};

EmailField.defaultProps = {
    touched: false,
    error: '',
    placeholder: '',
    className: '',
};

export default EmailField;