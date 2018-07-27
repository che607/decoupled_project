import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "components/Login/Login.jsx";
import indexRoutes from "routes/index.jsx";


import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/sass/light-bootstrap-dashboard.css?v=1.2.0";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";
import "./assets/css/stylesheet.css";
import "./assets/css/login.css";
import setAuthorizationToken from "./utils/setAuthorizationToken";

setAuthorizationToken(localStorage.jwtToken);

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/" component={Login} exact />
            {indexRoutes.map((prop, key) => {
                return <Route to={prop.path} component={prop.component} key={key} />;
            })}
        </Switch>
    </BrowserRouter>,
    document.getElementById("root")
);


