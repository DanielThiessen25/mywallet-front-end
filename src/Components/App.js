import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from './Login';
import SignUp from './SignUp';
import Records from './Records';
import AddIn from "./AddIn";
import AddOut from "./AddOut";
import UserContext from '../contexts/UserContext';

export default function App() {
    const [user, setUser] = useState();
    return (
        <BrowserRouter>
            <Switch>
                <UserContext.Provider value={{ user, setUser }}>
                    <Route path="/" exact={true} component={Login} />
                    <Route path="/sign-up" exact={true} component={SignUp} />
                    <Route path="/records" exact={true} component={Records} />
                    <Route path="/nova-entrada" exact={true} component={AddIn} />
                    <Route path="/nova-saida" exact={true} component={AddOut} />
                </UserContext.Provider>
            </Switch>
        </BrowserRouter>


    );
}