const { body, validationResult } = require("express-validator");

exports.validateNewUser = [
    body("username")
        .isLength({
            min:2,
            max:10
        })
        .withMessage("must contain atleast 2 to 10 characters")
        .escape(),
    body("password")
        .isLength({
            min:2,
            max:20
        })
        .withMessage("must contain atleast 2 to 20 characters")
        .escape(),
    body("name")
      .isLength({
        min:2,
        max:32
      })
      .withMessage("must contain atleast 2 to 32 characters")
      .escape(),
    body("email")
        .isEmail()
        .withMessage("is not valid")
        .escape(),
    (req,res,next)=>{
        const errors = validationResult(req);
        // console.log(errors);
        if(!errors.isEmpty()){
             return res.status(401).json({
                    message: errors.errors[0].param + " " + errors.errors[0].msg,
                    errors
                });
        }
        next();
    }
];
//Validate User for Login
exports.validatelogninUser = [
    body("username")
        .isLength({
            min:2,
            max:10
        })
        .withMessage("must contain atleast 2 to 10 characters")
        .trim()
        .escape(),
    body("password")
        .isLength({
            min:2,
            max:20
        })
        .withMessage("must contain atleast 2 to 20 characters")
        .escape(),
    (req,res,next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(401).json({
                    message: errors.errors[0].param + " " + errors.errors[0].msg,
                    errors
                });
        }
        next();
    }
];

//Update User Validator
exports.userUpdate = [
    body("password").optional().trim().escape(),
    body("name")
        .isLength({
            min:2,
            max:10
        })
        .withMessage("must contain atleast 2 to 10 characters")
        .trim()
        .escape(),
    body("email").optional().isBoolean().trim().escape(),
    (req,res,next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(401)
                .json({
                    message: errors.errors[0].param + " " + errors.errors[0].msg,
                    errors
                });
        }
        next();
    }
];