const asyncHandler=require("express-async-handler")
const jwt=require("jsonwebtoken")

const validatetoken=asyncHandler(async(req,res,next)=>{
    let token
    let authheader=req.headers.authorization||req.headers.Authorization
    if(authheader&&authheader.startsWith("Bearer")){
        token=authheader.split(" ")[1]
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
            if(err){
                res.status(400)
                throw new Error("User not authorized")
            }
            req.user=decoded.user
            next()
        })
        if(!token){
            res.status(401)
            throw new Error("User not authorized or token missing")
        }
    }
})
module.exports=validatetoken