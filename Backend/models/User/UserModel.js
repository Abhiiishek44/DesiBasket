const mongoose = require("mongoose");

const userSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true,  
    },
    email:{
        type:String,
        required:true,
        unique:true,    
    },
    password:{
        type:String,
        required:true,  
    },
    isAdmin:{
        type:Boolean,
        default:false,  
    },  
    isBlocked:{
        type:Boolean,
        default:false,  
    },
    address:{
        type:String,
        default:"",  
    },
    phone:{
        type:String,
        default:"",  
    },  
   
})

module.exports =mongoose.model("User",userSchema);