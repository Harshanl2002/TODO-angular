const mongoose=require('mongoose');
const Taskmodel = require('./models/UserModels');

mongoose.connect("mongodb://127.0.0.1:27017/TODO-CurdDB").then(
    ()=>
    {
        console.log("Connected");
    }
).catch((err)=>{
    console.log("not connected",err)
});

module.exports=mongoose;