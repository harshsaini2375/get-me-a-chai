import mongoose from "mongoose";
const {Schema, model} = mongoose

const userschema = new Schema ({
// capital s in string
    name:{type:String, required:true},
    Email:{type:String, required:true},
    coverpicture:{type:String},
    profilepicture:{type:String},
    razorpayid:{type:String},
    razorpaysecret:{type:String},
})

// in first we are exporting User in our models folder
//  and in second we are creating new user
export default  mongoose.models.User ||  model("User", userschema) ;