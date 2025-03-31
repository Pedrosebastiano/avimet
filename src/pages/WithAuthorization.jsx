import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const withAuthorization = (WrappedComponent, allowedRoles) => {
    return (props) => {
        const { logged, profile } = useContext(UserContext);
        const navigate = useNavigate();

        useEffect(() => {
            const checkAuthorization = async () => {
                if (!logged) {
                    navigate('/login'); // Redirect to login if not logged in
                } else if (!allowedRoles.includes(profile.userType)) {
                    navigate('/'); // Redirect to home if user role is not allowed
                }
            };

            checkAuthorization();
        }, [logged, profile, navigate]);

        return logged && allowedRoles.includes(profile.userType) ? (
            <WrappedComponent {...props} />
        ) : null;
    };
};

export default withAuthorization;