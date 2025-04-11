import React from 'react'
import PropTypes from 'prop-types'

const UserStatus = ({ status, name }) => {
    return (
        <>
            {status === "Inactive" && (
                <div className="d-flex align-items-center justify-content-center gap-2">
                    <div className="bg-secondary rounded" style={{ width: "8px", height: "8px" }}></div>
                    {name}
                </div>
            )}

            {status === "Active" && (
                <div className="d-flex align-items-center justify-content-center gap-2">
                    <div className="bg-success rounded" style={{ width: "8px", height: "8px" }}></div>
                    {name}
                </div>
            )}

            {status === "Pending" && (
                <div className="d-flex align-items-center justify-content-center gap-2">
                    <div className="bg-warning rounded" style={{ width: "8px", height: "8px" }}></div>
                    {name}
                </div>
            )}
        </>
    )
}

UserStatus.propTypes = {
    status: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
};

export default UserStatus