const { default: mongoose } = require("mongoose");


const eventSchema=new mongoose.Schema({

   trip_name:{
    type:String,
    trim:true,
   },
   date:{
    type:String,
   },
   events:{

   }
   
})
module.exports=mongoose.model('event',eventSchema);