import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {Route, Link, BrowserRouter} from 'react-router-dom'
import Register from "./register/Register";
import Signin from "./signin/Signin";
import Landing from "./Landing";
import Home from "./home/Home";
import App from "./App";
import LoggedInFrame from "./global/LoggedInFrame";
import Soogning from "./soogning/Soogning";
import Analytics from "./analytics/Analytics";
import Settings from "./settings/Settings";
import MaybeWebsocket from "./util/MaybeWebsocket";
import HostString from "./util/HostString";
import * as Cookies from "js-cookie";

const routing = (
  <BrowserRouter>
      <div className={"global"}>
          <Route exact path="/" component={App} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/home" render={(props) => {
              MaybeWebsocket.set(() => new WebSocket("ws://" + HostString + "/ws", Cookies.get('dm874_jwt')));

              return (
                  <LoggedInFrame child={<Home/>}/>
              )
          }} />
          <Route exact path="/soogning" render={(props) => (
              <LoggedInFrame child={<Soogning/>}/>
          )} />
          <Route exact path="/analytics" render={(props) => (
              <LoggedInFrame child={<Analytics/>}/>
          )} />
          <Route exact path="/settings" render={(props) => (
              <LoggedInFrame child={<Settings/>}/>
          )} />
      </div>
  </BrowserRouter>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
