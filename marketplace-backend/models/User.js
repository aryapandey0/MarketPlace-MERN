const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    name:String,
    email: { type: String, unique: true },
  password: String,
  role:{type:String ,enum:["CUSTOMER","SELLER","ADMIN"],default:"CUSTOMER"}

})

module.exports=mongoose.model("User",userSchema);