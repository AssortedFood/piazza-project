import Post from '../models/Post.js';
import auth from '../middleware/verifyToken.js';
import express from 'express';
const router = express.Router();

router.post('/create', auth, async(req, res)=>{ // create a post
    const { title, topic, body } = req.body;
    const owner = req.user._id;

    try {
        const newPost = new Post({title, topic, body, owner});
        await newPost.save();
        res.status(201).send("Post created.")
    } catch (err) {
        res.status(500).send(`Internal server error.${err.message}`);
    }
})

router.post('/topic/:topic', auth, async(req, res)=>{ // browse posts by topic

})

router.post('/:id/like', auth, async(req, res)=>{ // like a post

})

router.post('/:id/dislike', auth, async(req, res)=>{ // dislike a post

})

router.post('/:id/comments', auth, async(req, res)=>{ // add a comment to a post

})

router.post('/top?topic=:topic', auth, async(req, res)=>{ // get the post with the highest activityScore by topic

})

router.post('/expired?topic=:topic', auth, async(req, res)=>{ // get expired posts by topic

})