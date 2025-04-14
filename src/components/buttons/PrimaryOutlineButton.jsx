import React from 'react'
import PropTypes from 'prop-types';

const PrimaryOutlineButton = ({
    text,
    icon,
    onClick,
    type = 'button',
    className = '',
}) => {
    return (
        <button
            className={`rounded primary-outline-btn py-2 ${className}`}
            type={type}
            onClick={onClick}
        >
            <div className={`primary-outline-content d-flex justify-content-center align-items-center`}>
                {text}
                {icon && <i className={`ms-2 ${icon}`}></i>}
            </div>
            <span></span>
        </button>
    )
}

PrimaryOutlineButton.propTypes = {
    text: PropTypes.string.isRequired,
    icon: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,
    type: PropTypes.oneOf(['button', 'submit']),
};

PrimaryOutlineButton.defaultProps = {
    type: 'button',
    onClick: () => { },
    icon: '',
    className: '',
};

export default PrimaryOutlineButton