const express=require("express")
const { registerUserController, loginUserController, logoutUserController } = require("../controller/user.controller");
const { authMiddleware } = require("../middleware/auth.middleware");


const router=express.Router()

router.get("/cur-user",authMiddleware,(req,res)=>{
  return res.status(200).json({
    message: "Current user fetched",
    user: req.user,
  });
})
router.post("/register",registerUserController)
router.post("/login",loginUserController)
router.post("/logout",logoutUserController)

module.exports=router