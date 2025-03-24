import { useState, createContext, useMemo } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const isTokenValid = (token) => {
        return !!token;
    };

    const [auth, setAuth] = useState(() => {
        const token = localStorage.getItem('token');
        return isTokenValid(token);
    });

    const handleLogin = (accessToken, role, uuid) => {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('role', role);
        localStorage.setItem('uuid', uuid);
        setAuth(true);
    };

    const contextValue = useMemo(() => ({ auth, handleLogin }), [auth]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export {
    AuthProvider
};

export default AuthContext