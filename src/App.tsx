import React from 'react';
import './App.css';
import Signin from "./signin/Signin";

const App: React.FC = () => {
    const jwt = localStorage.getItem("dm874-jwt");

    if (jwt == null) {
        return (
            <div>
                <Signin></Signin>
            </div>
        );
    } else {
        return (
            <div>
                <h1>YOU ARE SIGNED IN!</h1>
            </div>
        );
    }
};

export default App;
