const Blog = require("../models/blog");
const Category = require("../models/blogCategory");
const Tag = require("../models/tag");
const formidable = require("formidable");
const fs = require("fs");
const { stripHtml } = require("string-strip-html");
const slugify = require("slugify");

//@function- For saving blog data in database
//@param - req, res object
//@return - return message according to result
exports.createBlog = (req,res)=>{
    const form = new formidable.IncomingForm() 
    form.keepExtensions = true;
    form.parse(req,(err,fields,files)=>{
        if(err){
            return res.status(403).json({error:"Image File couldn't be uploaded"});
        }

        let {title,categories,tags,body} = fields;
        
        if(!title || title.length<10 || title.length>60){
            return res.status(400).json({message:"title must contain 10 to 60 words."});
        }else if(!categories){
            return res.status(400).json({message:"At least one category must be included."});
        }else if(!tags){
            return res.status(400).json({message:"At least one tag must be included."});
        }else if(!body || body.length<200){
            return res.status(400).json({message:"Content is too Short. Please add more."});
        }
        const blog = new Blog();
        blog.title = title;
        blog.body = body;
        blog.postBy = req.user._id;
        blog.slug = slugify(title).toLowerCase();
        blog.categories = categories && categories.split(",");
        blog.tags = tags && tags.split(",");
        // console.log(stripHtml.stripHtml(body.substring(0,160)).result);
        blog.description = stripHtml(body.substring(0,160)).result;

        if(files.photo){
            if(files.photo.size>10000000){
                return res.status(400).json({message:"Image size must be less then 1mb"});
            }
            blog.photo.data = fs.readFileSync(files.photo.path);
            blog.photo.contentType = files.photo.type;
        }
        try{
            blog.save((err,data)=>{
                if(err || !data){
                    console.log(err);
                    return res.status(501).json({message:"Data couldn't be saved. Please Try again"});
                }
                res.status(200).json(data);
            });
        }catch(err){
            console.log(err)
            console.log("At Saving Blog");
        }
    });
}  

//@function - For reading all list of blogs
//@param - req,res object
//@return - return list of blogs if present
exports.BlogList = (req,res)=>{
    Blog.find({})
        .sort({"createdAt":-1})
        .populate("categories","_id name slug")
        .populate("tags","_id name slug")
        .populate("postBy","_id name username")
        .select("_id title slug body description categories tags postBy createdAt updatedAt")
        .exec((err,data)=>{
            if(err || !data){
                if (err)
                    return res.status(500).json({error:"Some Internal Error occured, please try again."})
                else if(!data){
                    return res.status(404).json({message:"No Blogs are Present, please create one."});
                }
            }
            return res.status(200).json(data);
        })

}
//@function - For reading all list of blogs with categories and tags
//@param - req,res object
//@return - return list of blogs 
exports.listOfBlogsWithCAndT  = (req,res)=>{
    let limit = req.body.limit ? parseInt(req.body.limit):8;
    let skip = req.body.skip ? parseInt(req.body.skip):0;
    let blogs,tags,categories;
    Blog.find({})
    .populate("categories","_id name slug")
    .populate("tags","_id name slug")
    .populate("postBy","_id name username")
    .sort({createdAt:-1})
    .skip(skip)
    .limit(limit)
    .select("_id title slug body description categories tags postBy createdAt updatedAt")
    .exec((err,data)=>{
        if(err){
            return res.status(500).json({error:"Error in getting Blogs, please try after some time."})
        }
        blogs = data;
        Category.find({})
        .exec((errInCat,categoryData)=>{
            if(errInCat){
                return res.status(500).json({error:"Error in getting Blogs, please try after some time."})
            }
            categories = categoryData;
            Tag.find({})
            .exec((errInT,tagData)=>{
                if(errInT){
                    return res.status(500).json({error:"Error in getting Blogs, please try after some time."})
                }
                tags = tagData;
                res.status(200).json({blogs,categories,tags,size:blogs.length});
            });
        })
    })
}
//@function - For reading blog photo
//@param - req,res object
//@return - return blog photo data
exports.getBlogPhoto = (req,res)=>{
    let slug = req.params.slug.toLowerCase()
    Blog.findOne({ slug })
        .select("photo")
        .exec((err,blog)=>{
            if(err || !blog){
                return res.status(400).json({error:"Error in fetching blog photo"});
            }
            res.set('Content-Type', blog.photo.contentType);
            return res.send(blog.photo.data);
        })
}
//@function - For reading single blogs Data
//@param - req,res object
//@return - Data of Single Blog 
exports.ReadSingleBlog = (req,res)=>{
    let slug = req.params.slug.toLowerCase()
    Blog.find({slug})
    .populate("categories","_id name slug")
    .populate("tags","_id name slug")
    .populate("postBy","_id name username")
    .select("_id title slug body description categories tags postBy createdAt updatedAt")
    .exec((err,data)=>{
        if(err){
            return res.status(500).json({error:"Error in getting Blog, please try after some time."})
        }
        let {_id,categories,tags} = data[0];
        Blog.find({_id:{$ne:_id},$or:[{categories:{$in:categories}},{tags:{$in:tags}}]})
            .populate("categories","_id name slug")
            .populate("tags","_id name slug")
            .populate("postBy","_id name username")
            .select("_id title slug body description categories tags postBy createdAt updatedAt")
            .exec((err,relatedData)=>{
                if(err){
                    return res.status(500).json({error:"Error in getting Blog, please try after some time."})
                }
                res.status(200).json({data,relatedData});
            });
    })
}
//@function - For Fetching Related Blogs
//@param - req,res object
//@return - Array of Objects ( Related Blogs )
// exports.RelatedBlogs = (req,res)=>{
//     let limit = req.body.limit ? parseInt(req.body.limit): 3;
//     const {_id,categories,tags} = req.body;
//     try{
        
//     }catch(err){
//         console.log(err);
//         return res.status(500).json({error:"Error in getting Blog, please try after some time."})
//     }
// }