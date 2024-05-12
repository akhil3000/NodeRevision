const express=require("express");
const router=express.Router();
require("dotenv").config();
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

const User=require("../models/user");//This model will create a record in database
//Register API
router.post("/register",async(req,res)=>{
    const user=req.body;
    user.password=await bcrypt.hash(user.password,10);
    const dbUser=await User.create(user);
    res.send(dbUser);


})

router.post("/login",async(req,res)=>{
    const{email,password}=req.body;//Fetching email and password from User
    const dbUser=await User.findOne({email});//finding respective email id from Database
    isPasswordSame=await bcrypt.compare(password,dbUser.password);//Comparing password from User and Password present in Database 
    if(isPasswordSame){
      const token=jwt.sign({email:dbUser.email,role:dbUser.role},process.env.JWT_SECRET);//If passwords are same assigning emailid,role and 
      //Secret Key to JWT Secret key to JWT Token
      res.send({token});   
    }else{
       res.status(401).send("Unauthorized");
    }
    
    

})


module.exports=router;