import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
// Plugins a hacer routing
import RegisterUser from './plugin-registro-usuarios-frontend/components/registro-usuario/RegisterUser';
import { Inicio } from './plugin-frontoffice/publico/Inicio/Inicio';
import {Contactanos} from './plugin-frontoffice/publico/contactanos/Contactanos';

export default function RouterPrincipal () {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Inicio />
                </Route>
                <Route path="/registro">
                    <RegisterUser />
                </Route>
                <Route path="/contactanos">
                    <Contactanos />
                </Route>
            </Switch>
        </Router>
    );
}