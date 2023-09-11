const mongoose=require('mongoose');

const TaskSchema=new mongoose.Schema({
    Taskname:{type:String},
    date:{type:Date},
    done:{type:Boolean}
});

const Taskmodel= mongoose.model('TODO',TaskSchema);

module.exports = Taskmodel; 