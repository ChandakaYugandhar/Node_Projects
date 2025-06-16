const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

//import Models
const userModel = require('./models/userModel');
const foodModel = require('./models/foodModel');
const trackingModel = require('./models/trackModel')
const verifyToken = require('./verifyToken');

//database connection

mongoose.connect("mongodb://localhost:27017/nutrify")
.then(()=>{
    console.log("DB Connection Successful");
})
.catch((err)=>{
    console.log(err);
})



const app = express();
app.use(express.json());
app.use(cors());

//endpoint for user registration

app.post('/register',(req,res)=>{
    let user = req.body;
    bcrypt.genSalt(10,(err,salt)=>{
        if(!err){
            bcrypt.hash(user.password,salt,async(err,hpass)=>{
                if(!err){
                    user.password=hpass;
                    try{
                        let doc = await userModel.create(user)
                        res.status(201).send({message:"User Registration Successful"});
                    }
                    catch(err){
                        console.log(err);
                        res.status(500).send({message:"Some Problem"});
                    }
                }
            })
        }
    })
})

//endpoint for User Login

app.post('/login',async (req,res)=>{
    let userCred = req.body;
    try{
        let user = await userModel.findOne({email:userCred.email})
        if(user!==null){
            bcrypt.compare(userCred.password,user.password,(err,result)=>{
                if(result==true){
                    jwt.sign({email:userCred.email},"yug180234",(err,token)=>{
                        if(!err){
                            res.send({message:"Login Successful",token:token})
                        }
                        else{
                            res.status(500).send({message:"Some issue while generating token please try again"})
                        }
                    })
                }
                else{
                    res.status(403).send({message:"Incorrect Password, Please try again"})
                }
            })
        }
        else{
            res.status(404).send({message:"User not found"})
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send({message:"Some Problem"})
    }
})
//endpoint to create food item

app.post('/addfood',verifyToken,async (req,res)=>{
    let foodItem = req.body;
    try{
        let food = await foodModel.create(foodItem)
        res.send({message:"Food Item Added Successfully"})
    }
    catch(err){
        console.log(err);
        res.send({message:"Some Problem In Adding Food"})
    }
})

//endpoint for fetch all food items

app.get('/foods',verifyToken,async (req,res)=>{
    try{
        let foodItems = await foodModel.find()
        res.send(foodItems)
    }
    catch(err){
        console.log(err);
        res.status(500).send({message:"Some problem while getting fooditems"});
    }
})

//enpoint to fetch food based on name

app.get('/foods/:name',verifyToken,async (req,res)=>{
    try{
        let foodItem = await foodModel.find({name:{$regex:req.params.name,$options:'i'}})
        if(foodItem.length!=0){
            res.send(foodItem);
        }
        else{
            res.status(404).send({message:"Food Item Not Found"})
        }
    }

    catch(err){
        console.log(err);
        res.status(500).send({message:"Some Problem"})
    }
})



//endpoint to track food

app.post('/track',verifyToken,async (req,res)=>{
    let trackFood = req.body;
    try{
        let food = await trackingModel.create(trackFood);
        console.log(food)
        res.status(201).send({message:"Food Added"})
    }
    catch(err){
        console.log(err);
        res.status(500).send({message:"Some problem in adding the food"})
    }

})


//endpoint to track food based on name and date

app.get('/track/:userid/:date',verifyToken,async (req,res)=>{
    let userid = req.params.userid;
    let date = new Date(req.params.date);
    let strDate = (date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear()
    try{
        let trackFood = await trackingModel.find({userId:userid,eatenDate:strDate}).populate('userId').populate('foodId');
        res.send(trackFood);
    }
    catch(err){
        console.log(err);
        res.status(500).send({message:"Some problem in tracking the food"})
    }
})




app.listen(8000,()=>{
    console.log("Server Up and Running");
})