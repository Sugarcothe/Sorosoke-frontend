import React, { Component } from "react";
import { list } from "./apiPost";
import avalon from "../images/images.jpg";
import { Link } from "react-router-dom";

class Post extends Component {
    constructor() {
        super();
        this.state = {
            post: []
        };
    }

    componentDidMount() {
        list().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ post: data });
            }
        });
    }

renderPost = post => {
    return (
        <div className="row">
            {post.map((post, i) => {
                const posterId = post.postedBy ? 
                `/user/${post.postedBy._id}` : ""
                const posterName = post.postedBy ? post.postedBy.name : "Uncknown"

                return (
                    <div className="card col-md-4" key={i}>
                    <div className="card-body">
                        <img src={`${process.env.REACT_APP_API_URL}/api/post/${post._id}`} 
                        onError={i => i.target.src = `${avalon}`}
                        className="img-thumbnail mb-3"
                        style={{width:'150', height: 'auto'}}
                        />

                        <p className="card-text">{post.body.substring(0, 100)}</p>
                            <hr/>
                            <p className="font-italic mark ">
                                Posted by <Link to={`${posterId}`}>{posterName}{"   "}
                                </Link>
                                on {new Date(post.created).toDateString()}
                            </p>
                        <Link
                            to={`/post/${post._id}`}
                            className="btn btn-raised btn-primary btn-sm"
                        >
                            Read More
                        </Link>
                    </div>
                </div>
                )
            })}
        </div>
    )
}
        
  

    render() {
        const { post } = this.state;
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Recent Posts</h2>

                {this.renderPost(post)}
            </div>
        );
    }
}

export default Post;