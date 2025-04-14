import React from 'react';
import PropTypes from 'prop-types';

const PrimaryButton = ({
    text,
    icon,
    onClick,
    type = 'button',
    disabled = false,
    loading = false,
    className = '',
}) => {
    return (
        <button
            className={`rounded primary-btn py-2 ${className}`}
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
        >
            <div className="primary-content d-flex justify-content-center align-items-center">
                {loading ? (
                    <>
                        Cargando
                        <output
                            className="spinner-border ms-1"
                            style={{ width: '1.25rem', height: '1.25rem' }}
                        >
                            <span className="visually-hidden">Cargando...</span>
                        </output>
                    </>
                ) : (
                    <>
                        {text}
                        {icon && <i className={`ms-2 ${icon}`}></i>}
                    </>
                )}
            </div>
            <span></span>
        </button>
    );
};

PrimaryButton.propTypes = {
    text: PropTypes.string.isRequired,
    icon: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
};

PrimaryButton.defaultProps = {
    type: 'button',
    disabled: false,
    onClick: () => { },
    icon: '',
    className: '',
    loading: false,
};

export default PrimaryButton;
