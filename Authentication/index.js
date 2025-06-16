const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


//Database Connection

mongoose.connect('mongodb://localhost:27017/apidev-demo')
.then(()=>{
    console.log("DB Connection Successful")
})
.catch((err)=>{
    console.log(err)
})


//crate userSchema

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true})


//model for user

const userModel = mongoose.model('students',userSchema);



//create app object
const app = express();
app.use(express.json());

//end point for user registration
app.post('/registration',(req,res)=>{
    let user=req.body;
    bcrypt.genSalt(10,(err,salt)=>{
        if(!err){
            bcrypt.hash(user.password,salt,(err,hpass)=>{
                if(!err){
                    user.password=hpass
                    userModel.create(user)
                    .then((user)=>{
                        console.log(user);
                        res.send({message:"User Registration Successful"});
                    })
                    .catch((err)=>{
                        console.log(err);
                        res.send({message:"Some problem"});
                    })
                }
            })
        }
    })
})

app.post('/login',(req,res)=>{
    let userCred=req.body;
    userModel.findOne({email:userCred.email})
    .then((user)=>{
        if(user!==null){
            bcrypt.compare(userCred.password,user.password,(err,result)=>{
                if(result===true){
                    jwt.sign({email:userCred.email},"yug@180234",(err,token)=>{
                        if(!err){
                            console.log("Login Successful!")
                            res.send({token:token})
                        }
                        else{
                            res.send({message:"Some issue while creating the token please try again"})
                        }
                    })


                }
                else{
                    res.send({message:"Incorrect Password"})
                }
            })
        }
        else{
            res.send({message:"Invalid Email or Username"})
        }
    })
    .catch((err)=>{
        console.log(err)
        res.send({message:"Some Problem"})
    })
})


app.get('/getdata',verifyToken,(req,res)=>{
    userModel.find({email:req.body.email},{password:0})
    .then((data)=>{
        res.send(data)
    })
    .catch((err)=>{
        res.send(err);
    })
    // res.send({message:"Welcome User"})
})

function verifyToken(req,res,next){
    let token = req.headers.authorization.split(" ")[1];
    jwt.verify(token,"yug@180234",(err,data)=>{
        if(!err){
            next()
        }
        else{
            res.send({message:"Invalid Token please login again"});
        }
    })
}


app.listen(8000,()=>{
    console.log("Server Up and Running")
})