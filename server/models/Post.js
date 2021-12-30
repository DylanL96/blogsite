const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types

const PostSchema = new mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  body:{
    type: String,
    required: true
  },
  comments:[{
    text: String,
    postedBy:{type: ObjectId, ref: 'User'}
  }],
  postedBy:{
    type: ObjectId,
    ref: 'User'
  }
}, {timestamps: true});

PostSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;