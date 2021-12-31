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
      {posts.map(post => 
        <div className="card text-center" key={post.id}>
          <div className="card-header">
            Featured
          </div>
        <div className="card-body" key={post.id}>
      <h5 className="card-title">{post.title}</h5>
          <p className="card-text"></p>
          <a href={`/posts/${post.id}`} className="btn btn-primary">Read more</a>
        </div>
        <div className="card-footer">
          Posted: {post.createdAt}
        </div>
      </div>
      )}
    </div>
  )
};

export default Home;

// {posts.map(post => 
//   <div key={post.id} classNameName="card">
//   <div classNameName="card-body">
//     <h5 classNameName="card-title">{post.title} Written by: {post.postedBy.username.charAt(0).toUpperCase()+post.postedBy.username.slice(1)}</h5>
//     <p classNameName="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//     <Link to={`/posts/${post.id}`}>Click to read more</Link>
//   </div>
// </div>
// )}