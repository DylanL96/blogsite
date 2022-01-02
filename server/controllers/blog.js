const Post = require('../models/Post');
const User = require('../models/User');

// Get all of the post content
const getPostContent = async(request, response) => {
  try{
    const allPosts = await Post.find({}).sort({createdAt:-1})
    .populate('postedBy', {username:1})
    response.json(allPosts);
  } catch (exception){
    console.log(exception)
  }
};

// create post data and submit into mongoDB with a POST request
const postContent = async(request, response) => {
  const {title, description, body} = request.body;

  if(!title || !body){
    return response.status(422).json('Please add all of the required fields')
  }
  try{
    const user = await User.findOne({});
    // creates the post based on the Post schema
    const post = new Post({
      title: title,
      description: description,
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
    const specificPost = await Post.findById(request.params.id)
    .populate('postedBy', {username:1})
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
};

const updateSpecificPost = async (request, response) => {
  const body = request.body;
  // console.log(body)
  const blog = {
    title: body.title,
    description: body.description,
    body: body.body
  }
  try{
    const updatedBlog = Post.findByIdAndUpdate(request.params.id, blog);
    return updatedBlog;

  }catch(exception){
    next(exception)
  }
};

module.exports = {
  getPostContent,
  postContent,
  specificPostContent,
  deleteSpecificPost,
  updateSpecificPost
}