import React from 'react'
import { Route, Switch } from 'react-router-dom';
import Home from './core/Home';
import Signup from './users/Signup'

const MainRouter = () => (
  
  <div>
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/Signup" component={Signup} /> 
      </Switch>
  </div>
     
);

export default MainRouter;