import React from 'react';
import Posts from '../post/Posts'

const Home = () => (
  <div className="fluid">
    <div className="jumbotron">
    <h2 className="Home">Vibers</h2>
    <p className="lead className"> Vibe with the community! </p>
  </div>

  <div className="container">
    <Posts/>
  </div>
  </div>
  
)

export default Home;