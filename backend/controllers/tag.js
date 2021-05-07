const Tag = require("../models/tag");
const slugify = require("slugify");

//@function For Saving New tag of blog in DataBase 
//@param {req} request Object
//@param {res} response Object
//@access private
exports.createTag = (req,res)=>{
    const {name} = req.body;
    const slug = slugify(name).toLowerCase();
    try{
        Tag.findOne({slug}).exec((err,data)=>{
            if(err){
                return res.status(500).json({error:"Server Error, Please try after Some Time."})
            }
            else if(data){
                return res.status(404).json({message:"tag already exist. please create different one."});
            }
            else{
                const tag = new Tag({name,slug});
                tag.save((err,data)=>{
                    if(err){
                        return res.status(500).json({error:"Server Error, Please try after Some Time."})
                    }else{
                        res.status(201).json(data);
                    }
                })
            }
        })
    }catch(err){
        return res.status(500).json({error:"Server Error, Please try after Some Time."})
    }
}
//@function For getting all tags as a list
//@param {req} request Object
//@param {res} response Object
//@access public
exports.getListOfTags = (req,res)=>{
    try{
        Tag.find({}).sort("slug").exec((err,data)=>{
            if(err || data.length === 0){
                if(err){
                    return res.status(500).json({error:"Server Error, Data can't be Fetched."});
                }else{
                    return res.status(404).json({message:"tag is not Present now."});
                }
            }
            res.status(200).json(data);
        });
    }catch(err){
        return res.status(500).json({error:"Server Error, Data can't be Fetched."});
    }
}
//@function For getting a tag
//@param {req} request Object
//@param {res} response Object
//@access public
exports.getTagByName = (req,res)=>{
    try{
        const slug = req.params.slug.toLowerCase();
        Tag.findOne({slug}).exec((err,data)=>{
            if(err || !data){
                return res.status(404).json({error:"tag can't be Fetched."});
            }
            res.status(200).json(data);
        })
    }catch(err){
        return res.status(500).json({error:"Server Error, Data can't be Fetched."});
    }
}
//@function For removing a tag
//@param {req} request Object
//@param {res} response Object
//@access private
exports.deleteTag = (req,res)=>{
    try{
        const slug = req.params.slug.toLowerCase();
        Tag.findOneAndDelete({slug}).exec((err,data)=>{
            if(err || !data){
                return res.status(404).json({error:"tag Doesn't Exist"});
            }
            res.status(200).json({message:"tag Deleted Successfully"});
        })
    }catch(err){
        return res.status(500).json({error:"Server Error, Data can't be Fetched."});
    }
}