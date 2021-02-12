import React, { Component } from 'react';
import {isAuthenticated} from "../auth";
import { Redirect, Link } from "react-router-dom";
import { read } from './apiUser';
import avatar from '../images/avatar.jpg';
import DeleteUser from './DeleteUser';


class Profile extends Component {
  constructor() {
    super()
    this.state = {
      user: "",
      redirectToSignin: false
    };
  }



  init = userId => {
    const token = isAuthenticated().token
    read(userId, token)
    .then(data => {
      if(data.error) {
        this.setState({redirectToSignin: true})
      } else {
        this.setState({user: data})
      }
    });
  };

componentDidMount() {
  const userId = this.props.match.params.userId;
  this.init(userId);
}


componentWillReceiveProps(props) {
  const userId = props.match.params.userId;
  this.init(userId);
}


  render() {
    const {redirectToSignin, user} = this.state
    if(redirectToSignin) 
    return <Redirect to="/signin" />

    const photoUrl = user._id
    ? `${process.env.REACT_APP_API_URL}/user/photo/${
        user._id
      }?${new Date().getTime()}`
    : avatar;


      
    return (
      <div className="container">
        <h2 className="mt-5 mb-2">{user.name}</h2>
        <div className="row">
          <div className="col-md-6">

          <img
              style={{ height: "200px", width: "auto" }}
              className="img-thumbnail"
              src={photoUrl}
              onError={i => (i.target.src = `${avatar}`)}
              alt={user.name}
            />
              
              <div className="row">
                <div className="col md-12 mt-2 mb-5">
                  <hr/>
                  <p className="lead">{user.about}</p>
                  <hr/>
                </div>
              </div>
          </div>
          
          <div className="col-md-6">

            <div className="lead mt-5 m-2">
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>{`Joined ${new Date(user.created).toDateString()}`}</p>
            </div>

          {isAuthenticated().user && 
          isAuthenticated().user._id === user._id && 
          (
            <div className="d-inline-block mt-5">
              <Link className="btn btn-raised btn-success mr-5"
              to={`/user/edit/${user._id}`}>
                Edit Profile
              </Link>
                <DeleteUser userId={user.Id}/>
            </div>
          )} 
        </div>
        </div>
      </div>
    )
  }
}

export default Profile
