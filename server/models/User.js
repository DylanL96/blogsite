const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types

const UserSchema = new mongoose.Schema({
  username:{
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  posts:{
    type: ObjectId,
    ref: 'Post'
  },
  role:{
    type: Number,
    default: 0,
  },
}, {timestamps: true});

UserSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const User = mongoose.model('User', UserSchema);

module.exports = User;