import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    // email:{
    //     type:String,
    //     required:true,
    //     unique:true,
    // },
    // firstName:{
    //     type:String,
    //     required:false,
    // },
    // lastName:{
    //     type:String,
    //     required:false,
    // },
    // phoneNumber:{
    //     type:String,
    //     required:false,
    // },
},{timestamps:true});

const User = mongoose.modal('User',userSchema);

export default User;