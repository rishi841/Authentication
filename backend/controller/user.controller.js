 const bcrypt=require("bcrypt");
 const jwt=require("jsonwebtoken")
const userModel = require("../models/user.model");
const registerUserController=async(req,res)=>{
    try {
        let {name,email,password}=req.body;
        if(!name ||!email ||!password){
            return res.status(400).json({
                message:"all field are required"
            })
        }
        let hassPass=await bcrypt.hash(password,5)
        
        let newUser=await userModel.create({
            name,
            email,
            password:hassPass
        })
        if(!newUser){
            return res.status(404).json({
                message:"user not found"
            })
        }

        let token=jwt.sign({id:newUser._id},process.env.JWT_SECRET_KEY,{expiresIn:"1h"})

        res.cookie("token",token)
        return res.status(201).json({
            message:"user created succesfully"
        })

    } catch (error) {
        console.log("error",error)
        return res.status(500).json({
            message:"internal server error"
        })
    }
}

const loginUserController=async(req,res)=>{
    try {
        let {email,password}=req.body;
        if(!email ||!password){
             return re.status(400).json({
                message:"all field are required"
             })
        }
         let user=await userModel.findOne({
            email
         })
         if(!user){
            return res.status(404).json({
                message:"user not found"
            })
         }

         let comparePass=await bcrypt.compare(password,user.password)

         if(!comparePass){
            return res.status(404).json({
                message:"Unauthorized!incorrect password"
            })
         }

         let token=jwt.sign({id:user._id},process.env.JWT_SECRET_KEY,{expiresIn:"1h"})

         res.cookie('token',token)

         return res.status(200).json({
            message:'user logged in',
            user
         })
        

    } catch (error) {
        console.log("error",error)
        return res.status(500).json({
            message:"internal server error"
        })
    }
}

const logoutUserController=async (req,res)=>{
     try {
    let { user_id } = req.body;

    if (!user_id)
      return res.status(404).json({
        message: "User not found",
      });

    let newUser = await userModel.findById(user_id);

    if (!newUser)
      return res.status(401).json({
        message: "User id not found ! Unauthorized",
      });

    res.clearCookie("token");

    return res.status(200).json({
      message: "User logged out",
      user: newUser,
    });
  } catch (error) {
    console.log("error in logout", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
};

module.exports={registerUserController,loginUserController,logoutUserController}