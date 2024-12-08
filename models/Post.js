import mongoose from "mongoose";
import moment from "moment";

function expirationDate(months = 6) { // define a function that allows the backend to set the expiration date for posts
    return moment().add(months, 'months').toDate();
}

const commentSchema = new mongoose.Schema({
    owner: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    body: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 256
    },
})

const PostSchema = new mongoose.Schema({
    // we can use mongoDB's built in _id variable
    owner: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    topic: {
        type: [String], // type is an array of strings, which allows users to assign more than one category to a post
        required: true,
        enum: ["Politics", "Health", "Sport", "Tech"] // these are the four valid topics
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    body: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 2048
    },
    expiration: {
        type: Date,
        required: true,
        default: expirationDate // set the expiration date to 6 months
    },
    status: {
        type: String,
        required: true,
        enum: ["Live", "Expired"],
        default: "Live"
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
    comments: [commentSchema] // since there can be multiple comments it is clearer to define the commentSchema separately and reference it here as an array
})



export default mongoose.model('post', PostSchema);