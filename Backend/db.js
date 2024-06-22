
const mongoose = require('mongoose');            //databse file which is cannect to the server 
const mongoURI = "mongodb://127.0.0.1:27017/durgesh";

const connectToMongo = async () => {      //cannectd to the detabase 
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

module.exports = connectToMongo; 
