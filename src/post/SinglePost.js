import React, { Component } from 'react';
import { singlePost, remove, like, unlike } from './apiPost';
import avalon from '../images/avalon.webp';
import { Link, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../auth';
import Comment from './Comment';



class SinglePost extends Component {
    state = {
        post: '',
        redirectToHome: false,
        redirectToSignin: false,
        like: false,
        likes: 0,
        comments: []
        
    };

    checkLike = likes => {
        const userId = isAuthenticated() && isAuthenticated().user._id
        let match = likes.indexOf(userId) !== -1;
        return match;
    }
    componentDidMount = () => {
        const postId = this.props.match.params.postId;
        singlePost(postId).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({

                    post: data,
                    likes: data.likes.length,
                    like: this.checkLike(data.likes),
                    comments: data.comments
                    
                });
            }
        });
    };

    updateComments = comments => {
        this.setState({comments})
    }

    likeToggle = () => {
        if(!isAuthenticated()) {
            this.setState({redirectToSignin: true})
            return false;
        }
        let callApi = this.state.like ? unlike : like
        const userId = isAuthenticated().user._id
        const postId = this.state.post._id
        const token = isAuthenticated().token

        callApi(userId, token, postId).then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                this.setState({
                    like: !this.state.like,
                    likes: data.likes.length
                })
            }
        })
    }


    deletePost = () => {
        const postId = this.props.match.params.postId;
        const token = isAuthenticated().token;
        remove(postId, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ redirectToHome: true });
            }
        });
    };

    deleteConfirmed = () => {
        let answer = window.confirm('Are you sure you want to delete your post?');
        if (answer) {
            this.deletePost();
        }
    };

    renderPost = post => {
        const posterId = post.postedBy ? `/user/${post.postedBy._id}` : '';
        const posterName = post.postedBy ? post.postedBy.name : ' Unknown';

        const { like, likes } = this.state;

        return (
            <div className="card-body">
                <img
                    src={`${process.env.REACT_APP_API_URL}/api/post/photo/${post._id}`}
                    alt={post.title}
                    onError={i => (i.target.src = `${avalon}`)}
                    className="img-thunbnail mb-3"
                    style={{
                        height: 'auto',
                        width: '300px',
                        objectFit: 'cover'
                    }}
                />

                {like ? (
                    <p onClick={this.likeToggle}>{likes}<i class="fas fa-heart text-danger"></i></p>
                ) : (
                    <p onClick={this.likeToggle}>{likes}<i class="far fa-heart"></i></p>
                )}

                

                <p className="card-text">{post.body}</p>
                <br />
                <p className="font-italic mark">
                    Posted by <Link to={`${posterId}`}>{posterName} </Link>
                    on {new Date(post.created).toDateString()}
                </p>
                <div className="d-inline-block">
                    <Link to={`/`} className="btn btn-raised btn-primary btn-sm m-1">
                        to posts
                    </Link>

                    {isAuthenticated().user && isAuthenticated().user._id === post.postedBy._id && (
                        <>
                            <Link to={`/post/edit/${post._id}`} className="btn btn-raised btn-primary btn-sm m-1">
                                Update
                            </Link>
                            <button onClick={this.deleteConfirmed} className="btn btn-raised btn-sm btn-danger m-1">
                            <i class="fas fa-trash-alt"></i>
                            </button>
                        </>
                    )}
                </div>
            </div>
        );
    };

    render() {
        const { post, redirectToHome, redirectToSignin, comments} = this.state;

        if (redirectToHome) {
            return <Redirect to={`/`} />;
        } else if (redirectToSignin) {
            return <Redirect to={`/signin`} />;
        }

        return (
            <div className="container">
                <p className="mt-5 mb-5 font-weight-bold">{post.title}</p>

                {!post ? (
                    <div className="jumbotron text-center">
                        <h2>Loading...</h2>
                    </div>
                ) : (
                    this.renderPost(post)
                )}

                <Comment postId={post._id} comments={comments} updateComment={this.updateComments}/>
            </div>
        );
    }
}

export default SinglePost;