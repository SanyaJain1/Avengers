const { default: mongoose } = require("mongoose");


const userSchema=new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim:true,
    },
    email_id:{
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        
},
    password:{
        type: Number,
        trim:true,
        unique:true,
        required:'password is required',

    },
    mobile_number:{
        type:Number,
        trim:true,
        required:'mobile number is required',
        minlength:[10,"Invalid mobile number"],
        maxlength:[10,"Invalid mobile number"]
    }
})

module.exports=mongoose.model('user',userSchema);