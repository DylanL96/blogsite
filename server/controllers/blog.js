const Post = require('../models/Post');
const User = require('../models/User');

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
  const {title, body} = request.body;

  if(!title || !body){
    return response.status(422).json('Please add all of the required fields')
  }
  try{
    const user = await User.findOne({});
    // creates the post based on the Post schema
    const post = new Post({
      title: title,
      body: body,
      postedBy: user._id
    });
    const savedPost = await post.save();
    response.json(savedPost)

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
};

// delete specific post
const deleteSpecificPost = async (request, response) => {
  try{
    await Post.findByIdAndDelete(request.params.id);
  }catch(exception){
    console.log(exception)
  }
}

module.exports = {
  getPostContent,
  postContent,
  specificPostContent,
  deleteSpecificPost
}