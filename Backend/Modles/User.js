const mongoose = require('mongoose');
const { Schema } = mongoose;
//schema means the format that type data willl be store in the database
const Userschema = new Schema({ 
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
   // unique: true, // Ensure the email field is marked as unique
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  }
}); 
 const User= mongoose.model('user', Userschema);
module.exports = User;
