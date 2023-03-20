const { default: mongoose } = require("mongoose");


const tripSchema=new mongoose.Schema({

   trip_name:{
    type:String,
    trim:true,
   },
   members:[
   ]
})
module.exports=mongoose.model('trip',tripSchema);
