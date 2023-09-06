

const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({

    name : {
        require : true , 
        type : String
    },
    email : {
        require : true ,
        type : String
    },
    password : {
        require : true ,
        type : String
    }
})

const userModel = mongoose.model("User" , userSchema)

module.exports = userModel