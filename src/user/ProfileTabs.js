import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import avatar from '../images/avatar.jpg';

class ProfileTabs extends Component {
  render() {
      const { following, followers, posts } = this.props;
      return (
          <div>
              <div className="row">
                  <div style={{fontWeight: 'bold'}} className="col-md-4">
                      <h5 className="text-primary">
                          {followers.length} Vibers
                      </h5>
                      <hr />
                      {followers.map((person, i) => (
                          <div key={i}>
                              <div>
                                  <Link to={`/user/${person._id}`}>
                                      <img
                                          style={{
                                              borderRadius: "50%",
                                              border: "1px solid black"
                                          }}
                                          className="float-left mr-2"
                                          height="30px"
                                          width="30px"
                                          onError={i =>
                                              (i.target.src = `${avatar}`)
                                          }
                                          src={`${
                                              process.env.REACT_APP_API_URL
                                          }/api/user/photo/${person._id}`}
                                          alt={person.name}
                                      />
                                      <div>
                                          <p className="lead">
                                              {person.name}
                                          </p>
                                      </div>
                                  </Link>
                              </div>
                          </div>
                      ))}
                  </div>

                  <div className="col-md-4">
                      <h5 style={{fontWeight: 'bold'}} className="text-primary">
                          {following.length} Vibes
                      </h5>
                      <hr />
                      {following.map((person, i) => (
                          <div key={i}>
                              <div>
                                  <Link to={`/user/${person._id}`}>
                                      <img
                                          style={{
                                              borderRadius: "50%",
                                              border: "1px solid black"
                                          }}
                                          className="float-left mr-2"
                                          height="30px"
                                          width="30px"
                                          onError={i =>
                                              (i.target.src = `${avatar}`)
                                          }
                                          src={`${
                                              process.env.REACT_APP_API_URL
                                          }/api/user/photo/${person._id}`}
                                          alt={person.name}
                                      />
                                      <div>
                                          <p className="lead">
                                              {person.name}
                                          </p>
                                      </div>
                                  </Link>
                              </div>
                          </div>
                      ))}
                  </div>

                  <div className="col-md-4">
                      <h4 style={{fontWeight: 'bold'}} className="text-primary">Posts</h4> 
                  </div>
              </div>
          </div>
      );
  }
}

export default ProfileTabs;