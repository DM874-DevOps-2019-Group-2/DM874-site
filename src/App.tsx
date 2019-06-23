import React from 'react';
import './App.css';
import Signin from "./signin/Signin";
import {Redirect} from "react-router";
import * as Cookies from "js-cookie";

const App: React.FC = () => {
    const jwt = Cookies.get('dm874_jwt');

    if (jwt !== undefined && jwt.length !== 0) {
        return (
            <Redirect to={"/home"}/>
        );
    } else {
        return (
            <Redirect to={"/signin"}/>
        );
    }
};

export default App;
