import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Route, Link, BrowserRouter} from 'react-router-dom'
import Register from "./register/Register";
import Signin from "./signin/Signin";

const routing = (
  <BrowserRouter>
      <div>
          <Route exact path="/" component={App} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/register" component={Register} />
      </div>
  </BrowserRouter>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
