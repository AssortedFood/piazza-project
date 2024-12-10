import mongoose from "mongoose";
import moment from "moment";
import { CommentSchema } from './Comment.js'

function expirationDate(months = 6) { // define a function that allows the backend to set the expiration date for posts
    return moment().add(months, 'months').toDate();
}

const PostSchema = new mongoose.Schema({
    // we can use mongoDB's built in _id variable
    author: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 256
    },
    topic: {
        type: [String], // type is an array of strings, which allows users to assign more than one category to a post
        required: true,
        enum: ["Politics", "Health", "Sport", "Tech"] // these are the four valid topics
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
    comments: [CommentSchema], // since there can be multiple comments it is clearer to define the commentSchema separately and reference it here as an array
    activityScore: {
        type: Number,
        default: 0
    }
}, { timestamps: true }) // use mongoose timestamps instead of defining our own

PostSchema.pre('save', function(next) { // this pre-save hook allows us to calculate an activity score for each post
    this.activityScore = this.likes + this.dislikes + (this.comments.length * 5) // we weight likes/dislikes as 1 point each and comments as 5 points each
    next();
  });

export default mongoose.model('post', PostSchema);