const connectToMongo = require('./db')    // this is the server file 
const express = require('express')
var cors = require('cors') 
const authRouteso=require('./routes/aouth20')
require("dotenv").config();
const passport = require("passport");
const authRoute = require("./googleAuth/routes/auth");
const cookieSession = require("cookie-session");
const passportStrategy = require("./googleAuth/passport");

connectToMongo();
var app = express()     

app.use(
	cookieSession({
		name: "session",
		keys: ["cyberwolve"],
		maxAge: 24 * 60 * 60 * 100,
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
	cors({
		origin: "http://localhost:3000",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);

app.use("/auth", authRoute);   //this rote for the google authontication



 app.get('/',(req,res)=>{
  res.send('hello word')
 })
//creating the route here
app.use(express.json())     //when request is comming from the client so handle this used 
app.use('/api/auth',require('./routes/autho')) // fist is the url path and anather is the file path
app.use('/api/notes',require('./routes/notes'))

app.use("/auth", authRouteso);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listenting on port ${port}...`));



