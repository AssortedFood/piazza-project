import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
    title: {
        type:String,
        require:true,
        
    }
})

export default mongoose.Model('posts', PostSchema);