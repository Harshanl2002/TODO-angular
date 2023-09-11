const express=require('express');
const {mongoose} =require('./script.js');
const bodyParser = require('body-parser');
const controller=require('./controller/Taskcontroller.js');
const cors=require('cors')

const app=express();

app.use(bodyParser.json());

app.use(cors('http://localhost:4200'))

app.listen('3000',()=> console.log("listening on port 3000"));

app.use('/tasks',controller)