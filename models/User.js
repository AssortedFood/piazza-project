import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        min:3,
        max:256
    },
    email:{
        type:String,
        required:true,
        unique:true,
        min:6,
        max:256
    },
    password:{
        type:String,
        required:true,
        min:6,
        max:1024
    },
    date:{
        type:Date,
        default:Date.now
    }
});

export default mongoose.model('users',userSchema);