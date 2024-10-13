import mongoose from "mongoose";
const {Schema, model} = mongoose

const paymentschema = new Schema ({

    oid:{type:String , required:true},
    name:{type:String, required:true},
    message:{type:String},
    to_user:{type:String, required:true},
    amount:{type:String , required:true},
    done:{type:Boolean, default:false}
    
})

export default mongoose.models.Payment || model("Payment", paymentschema)  ;