const jwt=require("jsonwebtoken");
const userModel = require("../models/user.model");

 let authMiddleware=async (req,res,next)=>{
    try {
        let token=req.cookies.token;
        if(!token){
        return    res.status(404).json({
                message:"token not found"
            })
        }
       
        let decode=jwt.verify(token,process.env.JWT_SECRET_KEY);
        if (!decode)
      return res.status(401).json({
        message: "Invalid token ! Unauthorized",
      });
       let user = await userModel.findById(decode.id);

    if (!user)
      return res.status(400).json({
        message: "User not found",
      });

    req.user = user;
    next();
                 
    } catch (error) {
        res.status(500).json({
            message:"internal server error",
        })
    }
}

module.exports={authMiddleware}