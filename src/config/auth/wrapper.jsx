import React from 'react';
import SignIn from '../../Routes/signin/SignIn';
import { useSelector } from 'react-redux';
const AuthWrapper = ({ children }) => {
    const loading = useSelector((state) => state.Auth.pendingUser);
    const authState = useSelector((state) => state.Auth.authenticated);
    if (loading) {
        // modify loading page 
        return <div>Loading...</div>;
    }

    if (authState) {
        return children;
    }
    return <SignIn />;
};

export default AuthWrapper;