import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import { Route } from "wouter";
import Guest from './components/guest';
import Login from './components/login';
import AdminSystem from "./components/AdminSystem";
import AdminUser from "./components/AdminUser";
import Reclutador from "./components/reclutador";
import Applicant from "./components/Applicant";
import Reviewer from "./components/reviewer";
import Coordinador from './components/coordinator';

function App() {
  
  return( 
    <Router>
      <Switch>
        <Route path= "/login">
          <Login/>
        </Route>
        <Route path= "/Applicant/:id">
          {params => <Applicant id={params.id} />}
        </Route>
        <Route path= "/Coordinador/:id">
          {params => <Coordinador id={params.id} />}
        </Route>
        <Route path= "/reviewer/:id">
          {params => <Reviewer id={params.id} />}
        </Route>
        <Route path= "/reclutar/:id">
          {params => <Reclutador id={params.id} />}
        </Route>
        <Route path="/AdminSystem">
          <AdminSystem />
        </Route>
        <Route path="/AdminUser">
          <AdminUser/>
        </Route>
        <Route path="/">
          <Guest/>
        </Route>
      </Switch>
    </Router>

  );
}

export default App;
