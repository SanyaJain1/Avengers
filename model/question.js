const { default: mongoose } = require("mongoose");


const quesSchema=new mongoose.Schema({

   trip_name:{
    type:String,
    trim:true,
   },
   question:{
    type:String,
   },
   options:[
   ]
})
module.exports=mongoose.model('question',quesSchema);