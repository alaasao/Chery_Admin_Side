import React from 'react';
import SignIn from '../../Routes/signin/SignIn';
import { useSelector } from 'react-redux';
import Loading from '../../utils/Loading';
const AuthWrapper = ({ children }) => {
    const loading = useSelector((state) => state.Auth.pendingUser);
    const authState = useSelector((state) => state.Auth.authenticated);
    if (loading) {
        // modify loading page 
        return <Loading/>;
    }

    if (authState) {
        return children;
    }
    return <SignIn />;
};

export default AuthWrapper;