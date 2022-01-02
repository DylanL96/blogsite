import React, {useState, useEffect} from 'react';
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
    },[]);

  const allPosts = () => (
    <div className="content pure-u-1 pure-u-md-3-4">
    <div className="posts">
            <h1 className="content-subhead">All Posts</h1>
            {posts.map(post => (
            <section className="post" key={post.id}>
            <header className="post-header">
                <h2 className="post-title">{post.title}</h2>
                <p className="post-meta">
                    By <a href="#" className="post-author">{post.postedBy.username}</a>
                </p>
            </header>
            <div className="post-description">
                <p>{post.body}</p>
            </div>
            <a className="btn btn-primary text-uppercase" href={`/posts/${post.id}`}>Read more →</a>
            <hr/>
        </section>
            ))}
            
        </div>
        <footer>
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

