import React from "react";
import { Routes as Switch, Route } from 'react-router-dom'
import Login from '../pages/login'
import Register from '../pages/register'


const Routes: React.FC = () => {
    return (
        <Switch>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Switch>
    );
};

export default Routes;
