import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Home = () => {
  const [posts, setPosts] = useState([]);
    useEffect(() => {
      axios
        .get('http://localhost:3001/blog/posts')
        .then(response => {
          setPosts(response.data)
          // console.log(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },[]);

  const allPosts = () => (
    <div>
    <header className="masthead" >
    <div className="container position-relative px-4 px-lg-5">
        <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
                <div className="site-heading">
                    <h1>CRUD Blog with the MERN Stack</h1>
                    <span className="subheading">A Blog Theme by Start Bootstrap</span>
                </div>
            </div>
        </div>
    </div>
    </header>
    {/* Main Content */}
    {posts.map(post => (
    <div className="container px-4 px-lg-5" key={post.id}>
    <div className="row gx-4 gx-lg-5 justify-content-center">
        <div className="col-md-10 col-lg-8 col-xl-7">
            <div className="post-preview">
                <a href={`/posts/${post.id}`}>
                    <h2 className="post-title">{post.title}</h2>
                    <h3 className="post-subtitle">{post.description}</h3>
                </a>
                <p className="post-meta">
                    Posted by {post.postedBy.username.charAt(0).toUpperCase()+post.postedBy.username.slice(1)}
                </p>
            </div>
            <hr className="my-4" />
            <div className="d-flex justify-content-end mb-4">
              <a className="btn btn-primary text-uppercase" href={`/posts/${post.id}`}>Read more →</a>
            </div>
        </div>
    </div>
    </div>
    ))}
    {/* Footer */}
    <footer className="border-top">
    <div className="container px-4 px-lg-5">
    <div className="row gx-4 gx-lg-5 justify-content-center">
      <div className="col-md-10 col-lg-8 col-xl-7">
          <ul className="list-inline text-center">
              <li className="list-inline-item">
                  <a href="https://twitter.com/Dylan_L96">
                      <span className="fa-stack fa-lg">
                          <i className="fas fa-circle fa-stack-2x"></i>
                          <i className="fab fa-twitter fa-stack-1x fa-inverse"></i>
                      </span>
                  </a>
              </li>
              <li className="list-inline-item">
                  <a href="https://www.linkedin.com/in/dylan-law-4b0307127/">
                      <span className="fa-stack fa-lg">
                          <i className="fas fa-circle fa-stack-2x"></i>
                          <i className="fab fa-linkedin fa-stack-1x fa-inverse"></i>
                      </span>
                  </a>
              </li>
              <li className="list-inline-item">
                  <a href="https://github.com/DylanL96">
                      <span className="fa-stack fa-lg">
                          <i className="fas fa-circle fa-stack-2x"></i>
                          <i className="fab fa-github fa-stack-1x fa-inverse"></i>
                      </span>
                  </a>
              </li>
          </ul>
      </div>
    </div>
    </div>
    </footer>
  </div>
  )
  return(
    <div>
      {allPosts()}
    </div>
  )
};

export default Home;

