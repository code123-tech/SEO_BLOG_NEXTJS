const { body, validationResult } = require("express-validator");

exports.checkTag = [
    body("name")
        .isLength({
            min:2,
            max:32
        })
        .withMessage("must contain 2 to 32 words.")
        .escape()
    ,(req,res,next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({message:"Tag "+errors.errors[0].param + " " +errors.errors[0].msg,errors});
        }
    next();
    }
]