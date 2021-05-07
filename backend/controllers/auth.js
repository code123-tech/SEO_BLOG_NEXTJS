const User = require("../models/user");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const Blog = require("../models/blog");
const transport = nodemailer.createTransport({
  service:"Gmail",
  secure:false,
  port:25,
  auth:{
    user:process.env.FROM_EMAIL,
    pass:process.env.PASS
  },tls:{
    rejectUnauthorized:false
  }
})
//@function For Saving New User in DataBase 
//@param {req} request Object
//@param {res} response Object
exports.signup = (req,res)=>{
    User.findOne({username:req.body.username}).exec((err,user)=>{
      if(user){
        res.status(403).json({error:"username Is Already Taken."});
      }
      else{
        User.findOne({email:req.body.email}).exec((err,user)=>{
          if(user){
            res.status(403).json({error:"Email Is Already Taken."});
          }
          else{
            const {username,name,email,password} = req.body;
            let newUser = new User({username,name,email,password});
            newUser.save((err,success)=>{
              if(err){
                res.status(500).json({error:err});
              }else{
                res.status(201).json({message:"Signup success. Please Signin"});
              }
            });
          }
        });
      }
    });
}
//@function For Login
//@param {req} request Object
//@param {res} response Object
exports.signin = (req,res)=>{
  const {username,password} = req.body;
  //Find User
  User.findOne({username}).exec((err,user)=>{
    if(err || !user){
      return res.status(401).json({
        error: 'User with that username does not exist. Please signup.'
      });
    };
    //authenitcate
    if(!user.authenticate(password)){
      return res.status(401).json({
        error: 'username or Password not matched.'
      });
    }
    //Generating token
    const token = jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"});

    res.cookie('token',token,{expiresIn:"1d"});
    const {_id,username,name,email,role} = user;
    return res.status(200).json({
      token,
      user:{_id,username,name,email,role}
    });
  });
}
//@function For Singout
//@param {req} request Object
//@param {res} response Object
exports.signout = (req,res)=>{
  res.clearCookie("token");
  res.json({
    message:"Signout Done."
  });
}
//@function For UserAuthentication
//@param {req} request Object
//@param {res} response Object
exports.userAuth = (req,res)=>{
  try{  
      const username = req.params.username;
      User.find({username}).exec((err,user)=>{
        if (err || user.length === 0) {
            if(err){
              throw err;
            }
            else
            {
              return res.status(401).json({
                error: 'User not found, Please register.'
            });
          }
        }

        let foundUser = user[0];
        foundUser.hashed_password = undefined;
        foundUser.salt = undefined;
        const id = foundUser._id;
        Blog.find({id}).then((blogs,err)=>{
          if(err || blogs.length === 0){
            if(err) throw err;
          }
          res.status(200).json({foundUser,blogs});
        });
      });
    }
    catch(err){
      console.log(err);
      return res.status(500).json({error:"Server Error, Please try after Some Time."});
    }
}
//@function For AdminAuthentication
//@param {req} request Object
//@param {res} response Object
exports.adminAuthentication = (req,res,next)=>{
  try{  
    // console.log("Hello from admin")
    const adminId = req.user._id;
    User.findById({_id:adminId}).exec((err,user)=>{
      if(err || !user){
        if(err){
          return res.status(500).json({error:"Server Error, Please try after Some Time."});
        }else{
          return res.status(404).json({message:"User not Found, please Signin or Register."});
        }
      }
      if(user.role === 0){
        return res.status(401).json({message:'Admin resource. Access denied'});
      }
      req.profile = user;
      next();
    });
  }
  catch(error){
    return res.status(500).json({error:"Server Error, Please try after Some Time."});
  }
}
//@function For Sending Email to user
//@param {req} request Object
//@param {res} response Object
exports.recoverPassword = (req,res)=>{
  const {username,email} = req.body;
  try{  
    User.findOne({username}).then((user,error)=>{
      if (error){
        throw error;
      }
      if(!user){
        return res.status(404).json({message:"User with given username not found. Please Register YourSelf."});
      }
      if(user.expireToken > Date.now()){
        return res.status(403).json({message:"You can't make Request as Your Previous Request is not Expired Yet."})
      }
      //token
      try{
        jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1200s"},(err,token)=>{
          if(err){
            throw err;
          }
          user.resetToken = token;
          user.expireToken = Date.now() + 1200000; //20 minutes
          user.save().then((result)=>{
            transport.sendMail({
              from:process.env.FROM_EMAIL,
              to:email,
              subject:"Link For Password Change.",
              html:`<h2>Request For Password Change</h2><br/>
                  <p>The Link will be expired in 20 minutes. So Change Password as soon as possible.</p>
                  <h5>Click on the <a href="${req.headers.origin}/reset_password/${token}">Link</a></h5>`
            },(err,data)=>{
              if(err) return res.status(402).json({error:"Error in Sending Email."})
              res.status(200).json({message:"Email with a Link is sent on your Mail. Please Check Mailbox."})
            })
          }) 
        })
      }catch(err){
        return res.status(501).json({error:"Internal Server Error"});
      }
    })
  }
  catch(error){
    return res.status(500).json({error:"Server Error, Please try after Some Time."});
  }
}
//@function For Checking resetToken
// exports.isTokenExpired = (req,res)=>{
//   const {resetToken} = req.body;
//   User.findOne({resetToken}).then((user,error)=>{
//     if(error) return res.status(501).json({error:"Server Error"});
//     if(!user || user.expireToken < Date.now()){
//       return res.status(403).json({message:"The Link is Not Valid. Go to Forgot Password."});
//     }
//     res.status(200).json({success:"Ok"});
//   })
// }
//@function For Updating User Password.
//@param - req,res Object
//@return - Message of error or success.
exports.updateUserPassword = (req,res)=>{
  const {resetToken,password} = req.body;
  User.findOne({resetToken}).then((user,err)=>{
    if(!user || (user && user.expireToken<Date.now())) return res.status(403).json({error:"Your Link has been expired. Please use Forgot Password again."});
    user.password = password;
    user.resetToken = undefined;
    user.expireToken = undefined;
    user.save().then((result)=>{
      return res.status(200).json({messsage:"Password SuccessFully Changed"});
    })
  })
}