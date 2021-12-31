import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [posts, setPosts] = useState([]);
    useEffect(() => {
      axios
        .get('http://localhost:3001/blog/posts')
        .then(response => {
          setPosts(response.data)
          console.log(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },[])

  return(
    <div>
      <h1>Home Page</h1>
      {posts.map(post => 
        <div key={post.id} className="card">
        <div className="card-body">
          <h5 className="card-title">{post.title} Written by: {post.postedBy.username}</h5>
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <Link to={`/posts/${post.id}`}>Click to read more</Link>
        </div>
      </div>
      )}
    </div>
  )
};

export default Home;
