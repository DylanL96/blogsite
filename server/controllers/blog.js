const Post = require('../models/Post');
const mongoose = require('mongoose');

// Get all of the post content
const getPostContent = (request, response) => {
  Post.find()
    .populate('postedBy')
    .populate('comments.postedBy')
    .then(posts => {
      return response.json(posts);
    })
    .catch(error => {
      console.log(error)
    })
};

// create post data and submit into mongoDB with a POST request
const postContent = (request, response) => {
  const {title, body, pic} = request.body;
  // console.log(title, body, pic)
  if(!title || !body){
    return response.status(422).json('Please add all of the required fields')
  }
  // creates the post based on the Post schema
  const post = new Post({
    title: title,
    body: body,
    photo: pic,
    postedBy: request.user
  })
  post.save()
    .then(result => {
      // console.log(result)
      response.json({post: result})
    })
    .catch(error => {
      console.log(error)
    })
};

// getting specific posts
const specificPostContent = (request, response) => {
  // console.log(require.params.id);
  Post.findById(request.params.id)
    .populate('postedBy')
    .populate('comments.postedBy')
    .then(result => {
      console.log(result)
      return response.json(result)
    })
    .catch(error => {
      console.log(error)
    })
}

module.exports = {
  getPostContent,
  postContent,
  specificPostContent
}