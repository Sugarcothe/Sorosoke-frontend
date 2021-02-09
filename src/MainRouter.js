import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Menu from './core/Menu'
import Home from './core/Home';
import Signup from './users/Signup';
import Signin from './users/Signin';
import Profile from './users/Profile'

const MainRouter = () => (
  
  <div>
    <Menu/>
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/Signup" component={Signup} /> 
        <Route path="/Signin" component={Signin} /> 
        <Route path="/user/:userId" component={Profile} /> 
      </Switch>
  </div>
     
);

export default MainRouter;