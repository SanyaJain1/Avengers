const { default: mongoose } = require("mongoose");


const reqSchema=new mongoose.Schema({

   trip_name:{
    type:String,
    trim:true,
   },
   requires:{
    type:String
   }
})
module.exports=mongoose.model('req',reqSchema);