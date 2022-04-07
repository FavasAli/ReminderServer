//importing mongoose to this file
const mongoose=require('mongoose')


//to state connection string
mongoose.connect('mongodb://localhost:27017/reminderApp',{
    useNewUrlParser:true
})


//model creation
const Reminder=mongoose.model('Reminder',{
    uname:String,
    uid:Number,
    pass:String,
    event:[]
})

//export model
module.exports={
    Reminder
}