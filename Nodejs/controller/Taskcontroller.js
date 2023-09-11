const express =require('express');
let router=express.Router();
let Taskmodel =require('../models/UserModels.js');
const ObjectId = require('mongoose').Types.ObjectId;

router.get('/true',(req,res)=>{
    Taskmodel.find({done:true}).sort({date:1}).then((err)=>{
        if(!err)
        {
            console.log("Error:",JSON.stringify(err,undefined,2))
            
        }
        else
        {
            res.send(err);   
        }
    });
});

router.get('/false',(req,res)=>{
    Taskmodel.find({done:false}).sort({date:1}).then((err)=>{
        if(!err)
        {
            console.log("Error:",JSON.stringify(err,undefined,2))
            
        }
        else
        {
            res.send(err);   
        }
    });
});

router.get('/:id',(req,res)=>{

    if(ObjectId.isValid(req.params.id))
    {
        Taskmodel.findById(req.params.id).then((data)=>{
            if(data)
            {
                res.send(data);
            }
            else
            {
                console.log("Error:nothing in this id");
            }
        })
    }
    else
    {
        res.send(400).send("ID not Corrrect");
    }
});


router.post('/',(req,res)=>{
    // console.log(req.body);
    let v=new Taskmodel({
        "Taskname":req.body.Taskname,
        "date":req.body.date,
        "done":req.body.done
    });
    Taskmodel.create(v).then((err)=>{
        if(!err)
        {
            console.log("Error:",JSON.stringify(err,undefined,2))
            
        }
        else
        {
            res.send(err);  
        }
    }).catch((e)=>{
        console.log(e)
    });
});
router.put('/:id',async (req,res)=>{
   
    if(ObjectId.isValid(req.params.id))
    {
        Taskmodel.findByIdAndUpdate(req.params.id,{$set:req.body},{new:1}).then((data)=>{
        console.log(data);
        if(data)
        {
            res.send(data);
        }
        else{
        console.log(data);
        }
    }).catch((err)=>{
        console.log(err);
    })
}

});

router.delete('/:id', (req,res)=>{
   
    if(ObjectId.isValid(req.params.id))
    {
        Taskmodel.findByIdAndRemove(req.params.id).then((data)=>{
        if(data){res.send(data);}
        else{console.log(data);}}).catch((err)=>{console.log(err);})
    }
    else{
        return res.send(400).send("ID not Corrrect");
    }

});



module.exports=router;