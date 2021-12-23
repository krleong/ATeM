import React from 'react';
import {Redirect, Route} from 'react-router-dom';

export default function ProtectedRoute({component: Component, ...props}) {
    const [logged] = React.useState(localStorage.getItem('logged')); 

    return (
        <Route 
            render={(props) => logged ? <Component {...props} /> : <Redirect to="/login" />}
        />
    );
}