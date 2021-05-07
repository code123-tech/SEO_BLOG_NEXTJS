const Category = require("../models/blogCategory");
const slugify = require("slugify");

//@function For Saving New Category of blog in DataBase 
//@param {req} request Object
//@param {res} response Object
//@access private
exports.createCategory = (req,res)=>{
    const {name} = req.body;
    const slug = slugify(name).toLowerCase();
    try{
        Category.findOne({slug}).exec((err,data)=>{
            if(err){
                return res.status(500).json({error:"Server Error, Please try after Some Time."})
            }
            else if(data){
                return res.status(404).json({message:"Category already exist. please create different one."});
            }
            else{
                const category = new Category({name,slug});
                category.save((err,data)=>{
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
//@function For getting all Categories as a list
//@param {req} request Object
//@param {res} response Object
//@access public
exports.getListOfBlogCategories = (req,res)=>{
    try{
        Category.find().sort("slug").exec((err,data)=>{
            if(err || data.length === 0){
                if(err){
                    return res.status(500).json({error:"Server Error, Data can't be Fetched."});
                }else{
                    return res.status(404).json({message:"Category is not Present now."});
                }
            }
            res.status(200).json(data);
        });
    }catch(err){
        return res.status(500).json({error:"Server Error, Data can't be Fetched."});
    }
}
//@function For getting a Category
//@param {req} request Object
//@param {res} response Object
//@access public
exports.getBlogCategory = (req,res)=>{
    try{
        const slug = req.params.slug.toLowerCase();
        Category.findOne({slug}).exec((err,data)=>{
            if(err || !data){
                return res.status(404).json({error:"Category can't be Fetched."});
            }
            res.status(200).json(data);
        })
    }catch(err){
        return res.status(500).json({error:"Server Error, Data can't be Fetched."});
    }
}
//@function For removing a Category
//@param {req} request Object
//@param {res} response Object
//@access private
exports.deleteBlogCategory = (req,res)=>{
    try{
        const slug = req.params.slug.toLowerCase();
        Category.findOneAndDelete({slug}).exec((err,data)=>{
            if(err || !data){
                return res.status(404).json({error:"Category Doesn't Exist"});
            }
            res.status(200).json({message:"Category Deleted Successfully"});
        })
    }catch(err){
        return res.status(500).json({error:"Server Error, Data can't be Fetched."});
    }
}