import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    author: {
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
        maxlength: 512
    },
})

export { CommentSchema };