import express from 'express';
const router = express.Router();

import Post from '../models/Post.js';
import { postValidation, topicValidation, idValidation, commentValidation } from '../validations/validation.js';

import auth from '../verifyToken.js';

router.post('/create', auth, async(req, res)=>{ // create a post
    const author = req.user._id;
    const { title, topic, body } = req.body;

    const {error} = postValidation({ title, topic, body })
    if (error) {
        return res.status(400).send({message:error['details'][0]['message']})
    }
    const newPost = new Post({title, topic, body, author});

    try {
        await newPost.save();
        res.status(201).send("Post created.")
    } catch (err) {
        res.status(500).send(`Internal server error.${err.message}`);
    }
})

router.post('/topic/:topic', auth, async(req, res)=>{ // browse posts by topic
    const {topic} = req.params;

    const {error} = topicValidation({ topic: [topic] })
    if (error) {
        return res.status(400).send({message:error['details'][0]['message']})
    }

    try {
        const posts = await Post.find({ topic, status: "Live" }); // return the list of Live posts from the provided topic

        if (!posts.length) {
            return res.status(404).send(`No posts found.`);
        }

        res.status(200).json(posts);
    } catch (err) {
        res.status(500).send(`Internal server error.${err.message}`);
    }
})

router.post('/:id/like', auth, async(req, res)=>{ // like a post
    const {id} = req.params;

    const {error} = idValidation({ id });
    if (error) {
        return res.status(400).send({message:error['details'][0]['message']});
    }

    try {
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).send("Post not found.");
        }

        if (post.author === req.user._id.toString()) {
            return res.status(400).send("Post owners cannot like their own posts.");
        }

        if (post.status === "Expired") {
            return res.status(400).send("Cannot like an expired post.");
        }

        post.likes += 1;
        await post.save();
        res.status(200).send("Post liked.");
    } catch (err) {
        res.status(500).send(`Internal server error.${err.message}`);
    }
});

router.post('/:id/dislike', auth, async(req, res)=>{ // dislike a post
    const {id} = req.params;

    const {error} = idValidation({ id });
    if (error) {
        return res.status(400).send({message:error['details'][0]['message']});
    }

    try {
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).send("Post not found.");
        }

        if (post.author === req.user._id.toString()) {
            return res.status(400).send("Post owners cannot dislike their own posts.");
        }

        if (post.status === "Expired") {
            return res.status(400).send("Cannot dislike an expired post.");
        }

        post.dislikes += 1;
        await post.save();
        res.status(200).send("Post disliked.");
    } catch (err) {
        res.status(500).send(`Internal server error.${err.message}`);
    }
});

router.post('/:id/comments', auth, async(req, res)=>{ // add a comment to a post
    const author = req.user._id;
    const {id} = req.params;
    const {body} = req.body;

    const {error} = commentValidation({ id, body });
    if (error) {
        return res.status(400).send({message: error['details'][0]['message']});
    }
    
    try {
        const post = await Post.findById(id);
        if (!post) return res.status(404).send("Post not found.");

        if (post.status === "Expired") {
            return res.status(400).send("Cannot comment on an expired post.");
        }

        post.comments.push({ author, body });
        await post.save();
        res.status(201).send("Comment submitted successfully.");
    } catch (err) {
        res.status(500).send(`Internal server error.${err.message}`);
    }
});

router.post('/top/:topic', auth, async(req, res)=>{ // get the post with the highest activityScore by topic
    const { topic } = req.params;

    const { error } = topicValidation({ topic: [topic] });
    if (error) {
        return res.status(400).send({ message: error['details'][0]['message'] });
    }

    try {
        const post = await Post.findOne({ topic, status: "Live" }).sort({ activityScore: -1 });

        if (!post) {
            return res.status(200).json({}); // returns an empty object as per REST guidelines
        }

        res.status(200).json(post);
    } catch (err) {
        res.status(500).send(`Internal server error.${err.message}`);
    }
});

router.post('/expired/:topic', auth, async(req, res)=>{ // get expired posts by topic
    const { topic } = req.params;
    
    const { error } = topicValidation({ topic: [topic] });
    if (error) {
        return res.status(400).send({ message: error['details'][0]['message'] });
    }

    try {
        const posts = await Post.find({ topic, status: "Expired" }).sort({ activityScore: -1 });

        if (!posts.length) {
            return res.status(404).send(`No posts found.`);
        }

        res.status(200).json(posts);
    } catch (err) {
        res.status(500).send(`Internal server error.${err.message}`);
    }
});

export default router;