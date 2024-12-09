const mongoose = require("mongoose")


const userAccountSchema = mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    
    createdDate:{
        type:Date,
        default:new Date(),
        required:true
    }
})

module.exports = mongoose.model("userAccount",userAccountSchema)