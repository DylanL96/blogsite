const User = require('../models/User');

// getting all users
const getUsersList = async(request, response) => {
  try{
    const allUsers = await User.find({})
    response.json(allUsers)
    console.log(allUsers)
  }catch(exception){
    console.log(exception)
  }
};


module.exports = {
  getUsersList,
}