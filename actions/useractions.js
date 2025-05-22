"use server"

import Razorpay from "razorpay";
import Payment from "@/models/Payment";
import connectDB from "@/db/connectDB";
import User from "@/models/User";

export const initiate = async (amount, paymentform, to_user, isdone, currentuser) => {

    await connectDB();
    // first create instance
    // second create options
    // third with the help of instance and options create generateorder
    // then return generateorder
    var instance = new Razorpay({ key_id: currentuser.razorpayid, key_secret: currentuser.razorpaysecret })

    let options = {
        "amount": Number.parseInt(amount) * 100,
        "currency": "INR"
    }

    // generate order
    let generateorder = await instance.orders.create(options)

    // create new payment in our database like we create new user before

    await Payment.create({
        'oid': generateorder.id,
        'name': paymentform.name,
        'message': paymentform.message,
        'to_user': to_user,
        'amount': amount,
        "done": isdone,
    })


    return generateorder;
}

export const fetchuser = async (username) => {
    await connectDB();
     
    let u = await User.findOne({ "name": username })
   
  if(u){

      let newuser = u.toObject({ flattenObjectIds: true })
      delete newuser._id;
      delete newuser.__v;
      
      return newuser
      
    }
}

export const fetchpayments = async (username) => {
    await connectDB()
    let mypayments = await Payment.find({ "to_user": username, "done": true }).limit(10).lean()

    mypayments.sort((a, b) => b.amount - a.amount);
    mypayments.forEach(obj=>{
        
        delete obj._id;
        delete obj.__v;   
            
    })


    return mypayments
}

export const updateprofile = async (data, oldusername) => {
    await connectDB()
    let newdata = Object.fromEntries(data)

    //  if someone is trying to update name ,check the name is not already in the database
    if (oldusername !== newdata.name) {
        let u = await User.findOne({ name: newdata.name })
        if (u) {
            return Error('this name is already exists')
        }
    }
    await User.updateOne({ Email: newdata.Email }, newdata)

}
