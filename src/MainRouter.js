import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Menu from './core/Menu'
import Home from './core/Home';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Profile from './user/Profile';
import Users from './user/Users';
import EditProfile from './user/EditProfile';
import FindPeople from './user/FindPeople';
import PrivateRoute from './auth/PrivateRoute';
import NewPost from './post/NewPost';
import EditPost from './post/EditPost';
import SinglePost from './post/SinglePost';
import ForgotPassword from "./user/ForgotPassword";
import ResetPassword from "./user/ResetPassword";




const MainRouter = () => (
  
  <div>
    <Menu/>
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        
        <Route
          exact
          path="/reset-password/:resetPasswordToken"
          component={ResetPassword}
        />
        <PrivateRoute 
          exact 
          path="/post/create" 
          component={NewPost} /> 

        <PrivateRoute 
          exact 
          path="/post/edit/:postId" 
          component={EditPost} /> 

        <Route exact path="/post/:postId" component={SinglePost} />
        <Route exact path="/users" component={Users} />
        <Route path="/signup" component={Signup} /> 
        <Route path="/signin" component={Signin} /> 

        <PrivateRoute 
          exact 
          path="/user/edit/:userId" 
          component={EditProfile} /> 
          
        <PrivateRoute 
          exact 
          path="/user/:userId" 
          component={Profile} />

        <PrivateRoute 
          exact 
          path="/findpeople" 
          component={FindPeople} />



        
      </Switch>
  </div>
     
);

export default MainRouter;