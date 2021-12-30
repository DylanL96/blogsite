const Post = require('../models/Post');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../utils/config');

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if(authorization && authorization.toLowerCase().startsWith('bearer ')){
    return authorization.substr(7)
  }
  return null
}

// Get all of the post content
const getPostContent = async(request, response) => {
  try{
    const allPosts = await Post.find({})
    .populate('postedBy', {username:1})
    response.json(allPosts);
  } catch (exception){
    console.log(exception)
  }
};

// create post data and submit into mongoDB with a POST request
const postContent = async(request, response) => {
  const {title, body, description} = request.body;
  const token = getTokenFrom(request);
  const decodedToken = jwt.verify(token, JWT_SECRET);
  // console.log(decodedToken.user._id);

  if(!title || !body){
    return response.status(422).json('Please add all of the required fields')
  }
  const user = await User.findById(decodedToken.user._id);

  // creates the post based on the Post schema
  const post = new Post({
    title: title,
    description: description,
    body: body,
    postedBy: user._id
  });
  try{
    const savedPost = await post.save();
    response.json(savedPost);
    // response.json({post: savedPost})
  }catch(exception){
    console.log(exception)
  }
};

// getting specific posts
const specificPostContent = async (request, response) => {
  // console.log(require.params.id);
  try{
    const specificPost = await Post.findById(request.params.id);
    if(specificPost){
      response.json(specificPost);
    }else {
      response.status(404).end()
    }
  }catch(exception){
    console.log(exception)
  }
}

module.exports = {
  getPostContent,
  postContent,
  specificPostContent
}