import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Home = () => {
  const [post, setPost] = useState([]);
  useEffect(() => {
    axios({
      method: 'GET',
      url: `http://localhost:3001/blog/posts`
    }).then(result => {
      console.log(result.data)
      setPost(result.data)
    },)
    .catch(error => {
      console.log(error)
    })
  },[])
  return(
    <div>
      <h1>Home Page</h1>
      {post.map(posts => <p>{posts.title}</p>)}
    </div>
  )
};

export default Home;