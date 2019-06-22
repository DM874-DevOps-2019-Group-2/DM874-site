import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {Route, Link, BrowserRouter} from 'react-router-dom'
import Register from "./register/Register";
import Signin from "./signin/Signin";
import Landing from "./Landing";
import Home from "./home/Home";
import Metrics from "./metrics/Metrics";

const routing = (
  <BrowserRouter>
      <div className={"global"}>
          <Route exact path="/" render={(props) => (
              <Landing child={<Home/>}/>
          )} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/home" render={(props) => (
              <Landing child={<Home/>}/>
          )} />
          <Route exact path="/metrics" render={(props) => (
              <Landing child={<Metrics/>}/>
          )} />
      </div>
  </BrowserRouter>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
