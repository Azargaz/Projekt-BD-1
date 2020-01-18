import React, { createContext, useContext } from 'react'

import { Route, Redirect } from 'react-router-dom'

const AuthContext = createContext(null);
const AuthProvider = AuthContext.Provider;
const AuthConsumer = AuthContext.Consumer;

const AuthRoute = ({ component: Component, ...rest }) => {
    const { authenticated } = useContext(AuthContext);
    return (
        <Route
            {...rest}
            render={(props) => authenticated === false ? <Redirect to='/login' /> : <Component {...props} />}
        />
    )
}

const AdminRoute = ({ component: Component, ...rest }) => {
    const { authenticated, decodedToken } = useContext(AuthContext);
    const { admin } = decodedToken;
    return (
        <Route
            {...rest}
            render={(props) => (authenticated === false || admin === false) ? <Redirect to='/' /> : <Component {...props} />}
        />
    )
}

const UnauthRoute = ({ component: Component, ...rest }) => {
    const { authenticated } = useContext(AuthContext);
    return (
        <Route
            {...rest}
            render={(props) => authenticated === true ? <Redirect to='/' /> : <Component {...props} />}
        />
    )
}

export {
    AuthContext,
    AuthProvider,
    AuthConsumer,
    AuthRoute,
    UnauthRoute,
    AdminRoute
};