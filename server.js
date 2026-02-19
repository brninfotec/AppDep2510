const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

const path = require("path");
 let app = express();
 app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use('/profilePics', express.static('profilePics'))


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'profilePics')
  },

  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`)
  }
})

const upload = multer({ storage: storage })

app.post("/validateToken",upload.none(),async(req,res)=>{
  console.log(req.body)
  let decrptedCredintials = jsonwebtoken.verify(req.body.token,"brn");

  console.log(decrptedCredintials)

 let userArr = await user.find().and([{email:decrptedCredintials.email}]);


 if(userArr.length > 0){
  let dataToSend ={
    firstName:userArr[0].firstName,
    lastName:userArr[0].lastName,
    age:userArr[0].age,
    email:userArr[0].email,
    mobileNo:userArr[0].mobileNo,
    profilePic:userArr[0].profilePic,
   
  }
  if(decrptedCredintials.password === userArr[0].password){
  res.json({status:"Success",msg:"Credintials are correct",data:dataToSend})
  }else{
    res.json({status:"Failure",msg:"Invalid Password"})
  }
 }else{
  res.json({status:"Failure",msg:"User Doesn't exist"})
 }

})
 
app.post("/login",upload.none(),async(req,res)=>{
  console.log(req.body)
 let userArr = await user.find().and([{email:req.body.email}]);

 let isValidPassword = await bcrypt.compare(req.body.password,userArr[0].password)

 let token = jsonwebtoken.sign({email:req.body.email,password:req.body.password},"brn")

 if(userArr.length > 0){
  let dataToSend ={
    firstName:userArr[0].firstName,
    lastName:userArr[0].lastName,
    age:userArr[0].age,
    email:userArr[0].email,
    mobileNo:userArr[0].mobileNo,
    profilePic:userArr[0].profilePic,
    token:token
  }
  if(isValidPassword === true){
  res.json({status:"Success",msg:"Credintials are correct",data:dataToSend})
  }else{
    res.json({status:"Failure",msg:"Invalid Password"})
  }
 }else{
  res.json({status:"Failure",msg:"User Doesn't exist"})
 }

})

 app.post("/signup",upload.single("profilePic"),async (req,res)=>{
    console.log(req.file)
    console.log(req.body);
    let hashedPassword = await bcrypt.hash(req.body.password,10)
 try{
    let student = new user({
     firstName:req.body.firstName,
    lastName:req.body.lastName,
    age:req.body.age,
    email:req.body.email,
    password:hashedPassword,
    mobileNo:req.body.mobileNo,
    profilePic:req.file.path   
    });
    await user.insertMany([student]);
    console.log("Data inserted Successfully")
    res.json({status:"Success",msg:"Account created Successfully"})
    }catch(err){
    console.log("Unable to insert");
    res.json({status:"Failure",msg:"Unable to create account"})
    }
 })

 app.patch("/updateProfile",upload.single("profilePic"),async(req,res)=>{
  try{
  if(req.body.firstName.trim().length>0){
  await user.updateMany({email:req.body.email},{firstName:req.body.firstName})
  }

  if(req.body.lastName.trim().length>0){
  await user.updateMany({email:req.body.email},{lastName:req.body.lastName})
  }

  if(req.body.age>0){
  await user.updateMany({email:req.body.email},{age:req.body.age})
  }

  if(req.body.password.trim().length>0){
  await user.updateMany({email:req.body.email},{password:req.body.password})
  }

  if(req.body.mobileNo>0){
  await user.updateMany({email:req.body.email},{mobileNo:req.body.mobileNo})
  }

  if(req.file){
  await user.updateMany({email:req.body.email},{profilePic:req.file.path})
  }

  res.json({status:"Success",msg:"User Updated Successfully"})
  }catch(err){
  res.json({status:"Failure",msg:"Nothing is updated"})
  }
   
 });

 app.delete("/deleteProfile",upload.none(),async(req,res)=>{
 let delResult= await user.deleteMany({email:req.body.email});

 if(delResult.deletedCount>0){
 res.json({status:"Success",msg:"User deleted Successfully"})
 }else{
  res.json({status:"Failure",msg:"Nothing to delete"})
 }
 })

 app.use(express.static(path.join(__dirname, "client/build")));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});
 
 app.listen(process.env.PORT,()=>{
    console.log(`Listening to port ${process.env.PORT}`)
 })

let userSchema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    age:Number,
    email:String,
    password:String,
    mobileNo:Number,
    profilePic:String
});

let user = new mongoose.model("users",userSchema,"2510users");

let connectedToMDB = async ()=>{
    try{
    await mongoose.connect(process.env.MDBURL);
    console.log("Successfully Connected To MDB");
    
    }catch(err){
    console.log("Unable to Connect MDB")
    }
  
}

connectedToMDB();