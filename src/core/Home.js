import React from 'react';
import Posts from '../post/Posts'

const Home = () => (
  <div className="container fluid">
    <div className="jumbotron">
    <h2 className="Home">Home</h2>
    <p className="className">Welcome to React Frontend</p>
  </div>

  <div className="container">
    <Posts/>
  </div>
  </div>
  
)

export default Home;