require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');
const helmet = require("helmet");
const app = express();

//DataBase
try{
  mongoose.connect(process.env.DATABASE,{useNewUrlParser:true,useCreateIndex:true,useFindAndModify:true,useUnifiedTopology:true})
  .then(()=>console.log("connection"))
  .catch((err)=>console.log(err));
}catch(err){
  console.log(err);
}
//Blog and user Authentication Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const blogCategoryRoutes = require("./routes/blogCategory");
const tagRoutes = require("./routes/tag");
const blogRoutes = require("./routes/blog");

//Write Stream For Getting all logs
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
//Middlewares 
app.use(morgan("dev", { stream: accessLogStream }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet()); //mixture of 11 small functions.
app.use(cors());

//routes Middlewares
try{
  app.use("/api",authRoutes);
  app.use("/api",userRoutes);
  app.use("/api",blogCategoryRoutes);
  app.use("/api",tagRoutes);
  app.use("/api",blogRoutes);
}
catch(err){
  console.log("Error in adding Middlewares");
}

const port = process.env.PORT || 8000;
try
{app.listen(port,()=>{
  console.log(`Server is running at port ${port}`);
});}catch(err){
  console.log("Error in connecting to Server");
}