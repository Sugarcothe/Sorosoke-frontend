import React, { Component } from 'react';
import {list} from './apiUser';
import avatar from '../images/avatar.jpg';
import {Link} from 'react-router-dom'
 
class Users extends Component {
  constructor() {
    super()
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    list().then(data => {
      if(data.error) {
        console.log(data.error)
      } else {
        this.setState({users: data})
      }
    })
  }

  renderUsers = users => (
    
    <div className="row">
      {users.map((user,i) => 
      (
        <div className="card col-md-2 m-1 justify-content-center"  key={i}>

        <img style={{height: "auto", width: "180px"}} 
          className="img-thumbnail"
          src={`${process.env.REACT_APP_API_URL}/api/user/photo/${
            user._id
          }`}
          onError={i => {i.target.src = `${avatar}`}}
          alt={user.name}/>         

          <div className="card-body">
            <h5 className="card-title">{user.name}</h5>
            <p className="card-text">{user.email}</p>

            <Link 
            to={`/user/${user._id}`}
            className="btn btn-raised btn-sm btn-primary">View Profile</Link>
          </div>
        </div>

      
      ))}
    </div>
  )


  render() {
    const {users} = this.state

    return (
      <div>
        <div className="container">
          <h2 className="mt-5 mb-5">Users</h2>

            {this.renderUsers(users)}
        </div>
      </div>
    )
  }
}

export default Users
