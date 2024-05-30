const asyncHandler=require("express-async-handler")
const User=require("../models/userModel")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const registerUser = asyncHandler(async(req,res)=>{
    const {username,email,password}=req.body//fetch from client
    if(!username||!email||!password){
        res.status(400)
        throw new Error("All fields are madatory")
    }
    const userAvailable=await User.findOne({email})
    if(userAvailable){
        res.status(400)
        throw new Error("User already registered")
    }

    //create new user
    const hashedpassword=await bcrypt.hash(password,10)
    console.log("Hashed password",hashedpassword);
    const user=await User.create({
        username,
        email,
        password:hashedpassword
    })
    console.log(`user created ${user}`);
    if(user){//successful user created
        res.status(201).json({_id:user.id,email:user.email})//shown to user
    }
    else{
        res.status(400)
        throw new Error("user data not valid")
    }
    res.json({message:"Register user"})
})
const loginUser = asyncHandler(async(req,res)=>{
    const {email,password}=req.body
    if(!email||!password){
        res.status(400)
        throw new Error("All fields are madatory")
    }
    const user=await User.findOne()//finding user in database
    //now compare entered password with hashedpassword stored in database
    if(user&&(await bcrypt.compare(password,user.password))){
        const accessToken=jwt.sign({//providing access token to user
            user:{
                username:user.username,
                email:user.email,
                id:user.id
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"15m"}//expiry time of token
    )
    res.status(200).json({accessToken})//using this access token to access private routes
    }else{
        res.status(400).json("email or password not valid")
    }
})
const CurrentInfo = asyncHandler(async(req,res)=>{
    res.json(req.user)
})

module.exports={registerUser,loginUser,CurrentInfo}