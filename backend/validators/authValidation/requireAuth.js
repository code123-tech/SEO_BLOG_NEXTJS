const jwt = require("jsonwebtoken");
exports.auth = (req,res,next)=>{
    try{
        // console.log("Hello from auth");
        // console.log(req);
        var token = req.cookies.token;
        try{
            if(req.headers.authorization){
                var arr = req.headers.authorization.split(" ");
                token = arr[1];
            }
        }catch(err){
            console.log(err);
        }
        if (!token){
            return res.status(401).json({message:"Authorization Denied. Please Signin or Register"});
        }
        try{
            const jwtverfiy = jwt.verify(token,process.env.JWT_SECRET);
            req.user = jwtverfiy;
            next();
        }catch(err){
            console.log(err);
            return res.status(500).json({error:"Some server error occured. Please Try after some time."})
        }
    }catch(err){
        return res.status(500).json({error:"Some server error occured. Please Try after some time."});
    }
}