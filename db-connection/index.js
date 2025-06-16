const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/apidev-demo')
.then(()=>{
    console.log("Connection Successful")
})
.catch((err)=>{
    console.log(err)
})

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is mandatory']
    },
    password:{
        type:String,
        minLength:[6,'minimum length is 6'],
        maxLength:[12,'Maximum length is 12'],
        required:[true,'Password is mandatory']
    },
    age:{
        type:Number,
        min:20,
        max:100,
        required:[true,'age should be between 20 to 100']
    },
    role:{
        type:String,
        enum:['administrator','manager','employee']
    }},{timestamps:true});


    const userModel=mongoose.model('users',userSchema);


    //inserting data

    // let user={
    //     name:"Mani Babu",
    //     password:'Mani@169',
    //     age:22,
    //     role:"employee"
    // }

    // userModel.create(user)
    // .then((data)=>{
    //     console.log(data)
    //     console.log("Inserted Successfully")
    // })
    // .catch((err)=>{
    //     console.log(err)
    // })


    //retrieving data

    // userModel.find()
    // .then((data)=>{
    //     console.log(data)
    // })
    // .catch((err)=>{
    //     console.log(err)
    // })

    // userModel.findOne()
    // .then((data)=>{
    //     console.log(data)
    // })
    // .catch((err)=>{
    //     console.log(err)
    // })


    // userModel.find({name:"Yugandhar",age:21})
    // .then((data)=>{
    //     console.log(data)
    // })
    // .catch((err)=>{
    //     console.log(err)
    // })

//sort by ascending order
    // userModel.find({name:"Yugandhar"}).sort({age:1})
    // .then((data)=>{
    //     console.log(data)
    // })
    // .catch((err)=>{
    //     console.log(err)
    // })
//sorting by descending order
    // userModel.find({name:"Yugandhar"}).sort({age:-1})
    // .then((data)=>{
    //     console.log(data)
    // })
    // .catch((err)=>{
    //     console.log(err)
    // })

    // userModel.find({name:"Yugandhar"}).sort({age:1}).limit(2)
    // .then((data)=>{
    //     console.log(data)
    // })
    // .catch((err)=>{
    //     console.log(err)
    // })

// userModel.deleteOne({name:'Ravi Kumar'})
// .then((data)=>{
//     console.log(data)
//     console.log("Deleted Successfully")
// })
// .catch((err)=>{
//     console.log(err)
// })

// userModel.deleteMany({name:'Ravi Kumar'})
// .then((data)=>{
//     console.log(data)
//     console.log("Deleted Successfully")
// })
// .catch((err)=>{
//     console.log(err)
// })


userModel.updateOne({name:"Ravi Kumar"},{role:"administrator"})
.then((data)=>{
    console.log(data)
    console.log("Updated Successfully")
})
.catch((err)=>{
    console.log(err)
})