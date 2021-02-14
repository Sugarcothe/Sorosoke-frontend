import React, { Component } from 'react';
import {singlePost} from './apiPost';
import avalon from "../images/images.jpg";
import { Link } from "react-router-dom";


export class SinglePost extends Component {

  state = {
    post: ''
  }
  componentDidMount = () => {
    const postId = this.props.match.params.postId;
    singlePost(postId).then(data => {
      if(data.error) {
        console.log(data.error)
      } else {
        this.setState({post: data})
      }
    })
  }

  renderPost = post => {
    const posterId = post.postedBy ? `/user/${post.postedBy._id}` : 
    "";
    const posterName = post.postedBy ? post.postedBy.name : "Uncknown"
     
      return (
       
        <div className="card-body">

            <img 
            src={`${process.env.REACT_APP_API_URL}/api/post/${post._id}`} 
              onError={i => i.target.src = `${avalon}`}
              className="img-thumbnail mb-3"
              style={{width:'150', height: 'auto'}}
              />

            <p className="card-text">{post.body}</p>
                <hr/>
                <p className="font-italic mark ">
                    Posted by <Link to={`${posterId}`}>{posterName}{"   "}
                    </Link>
                    on {new Date(post.created).toDateString()}
                </p>
            <Link
                to={`/`}
                className="btn btn-raised btn-primary btn-sm"
            >
                Back to post
            </Link>
        </div>
   
    )
    
  }



  render() {
    const {post} = this.state
    return (
      <div className="container">
        {this.renderPost(post)}
      </div>
    )
  }
}

export default SinglePost
