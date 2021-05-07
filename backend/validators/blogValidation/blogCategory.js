const { body, validationResult } = require("express-validator");

exports.checkBlogCategory = [
    body("name")
        .isLength({
            min:3,
            max:32
        })
        .withMessage("must contain 3 to 32 words.")
        .escape()
    ,(req,res,next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({message:"Category "+errors.errors[0].param + " " +errors.errors[0].msg,errors});
        }
    next();
    }
]