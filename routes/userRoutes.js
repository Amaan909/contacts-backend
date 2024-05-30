const express=require("express")
const { registerUser,loginUser,CurrentInfo } = require("../controllers/userControllers")
const validatetoken = require("../middleware/validateTokenHandler")
const router=express.Router()

router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/current",validatetoken,CurrentInfo)//protected route


module.exports=router