import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const LoginCheckRoute = ({ component: Component, ...rest }) => {
        return (
                <Route
                        {...rest}
                        render={props => {
                                if (localStorage && localStorage.getItem('accessToken')) {
                                        return <Redirect to="/manager" />
                                } else {
                                        return <Component {...props} />
                                }
                        }}
                />
        );
}

export default LoginCheckRoute;