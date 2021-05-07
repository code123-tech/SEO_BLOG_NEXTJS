const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');  //Unique id Generation
const pbkdf2 = require('pbkdf2'); //For Hashing the password
const userSchema = new mongoose.Schema({
  username:{
    type:String,
    trim:true,
    unique:true,
    required:true,
    index:true
  },
  name:{
    type:String,
    trim:true,
    required:true
  },
  email:{
    type:String,
    unique:true,
    trim:true,
    required:true
  },
  hashed_password:{
    type:String,
    required:true,
  },
  salt:String,
  about:{
    type:String,
    default:""
  },
  role:{
    type:Number,
    default:0
  },
  photo:{
    data:Buffer,
    contentType:String,
    default:""
  },
  resetToken:{
    type:String,
    default:""
  },
  expireToken:{default:"",type:String}
},{timestamps:true});

userSchema
  .virtual('password')
  .set(function(password){
    this._password = password;
    this.salt = uuidv4();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function(){
    return this._password;
  });

userSchema.pre("save",function(next){
  if(this.isModified("password")){
    this.hashed_password = this.encryptPassword(this.password);
    next();
  }
  next();
})
userSchema.methods = {
  authenticate:function(password){
    return this.encryptPassword(password) === this.hashed_password;
  },
  encryptPassword:function(password){
    if(!password) return "";
    try{
      let pass = pbkdf2.pbkdf2Sync(password,this.salt,10000,64,"sha512");
      return pass.toString("hex");
    } 
    catch(error){
      return "";
    }
  }
}

module.exports = mongoose.model("User",userSchema);