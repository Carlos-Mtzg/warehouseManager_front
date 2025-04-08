import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import PropTypes from 'prop-types';
import AuthContext from '../context/AuthProvider';

const RoleBasedRoute = ({ allowedRoles }) => {
    const { auth, role } = useContext(AuthContext);

    if (!auth) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(role)) {
        switch (role) {
            case "ROLE_USER":
                return <Navigate to="/user" replace />;
            case "ROLE_ADMIN":
                return <Navigate to="/admin" replace />;
            default:
                return <Navigate to="/" replace />;
        }
    }

    return <Outlet />;
};

RoleBasedRoute.propTypes = {
    allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default RoleBasedRoute;