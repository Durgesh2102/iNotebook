const mongoose = require('mongoose');     //schema file of notes 
const { Schema } = mongoose;
const Noteschema = new Schema({ 
  user:{
      type : mongoose.Schema.Types.ObjectId,   //its like the forgein key here we store the user id whch it sotred in the userSchema 
    ref:'user'
  },
   title:{
    type:String,
    requird:true 
   },
   description:{
    type : String,
    requird:true
   },
   color:{
    type:String,
    
   },
   Archive:{
    type:String
   },
   date: {
    type: Date,
    default: Date.now,
  }
 });
 module.exports = mongoose.model('note',Noteschema)
