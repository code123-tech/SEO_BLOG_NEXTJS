const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        required:true
    },
    slug:{
        type:String,
        index:true,
        unique:true
    },
    body:{
        type:{},
        min:200,
        max:2000000,
        required:true
    },
    photo:{
        data:Buffer,
        contentType:String,
        default:""
    },
    description:{
        type:String,
        default:""
    },
    categories:[{type:mongoose.Schema.Types.ObjectId,ref:"Category"}],
    tags:[{type:mongoose.Schema.Types.ObjectId,ref:"Tag"}],
    postBy:{type:mongoose.Schema.Types.ObjectId,ref:"User"}
},{timestamps:true});

module.exports = mongoose.model("Blog",blogSchema);