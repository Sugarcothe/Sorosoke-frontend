import React, { Component } from 'react';
import { follow, unfollow } from "./apiUser";


export class FollowProfileButton extends Component {

  followClick = () => {
    this.props.onButtonClick(follow)
  };

  unfollowClick = () => {
    this.props.onButtonClick(unfollow)
  };


  render() {
    return (
      <div>
        <div className="d-inline-block">
          {
            !this.props.following ?
            (
              <button onClick={this.followClick} className="btn btn-success btn-raised m-2">
                Vibe
              </button>
            ) : (
              <button onClick={this.unfollowClick} className="btn btn-danger btn-raised m-2">
                Unvibe
              </button>
            )
          }
         
          
        </div>
      </div>
    )
  }
}

export default FollowProfileButton
