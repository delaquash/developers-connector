const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const User = require('../../model/User');
const Profile = require('../../model/Profile');
const Post = require('../../model/Post');


// @route Get api/post
// @desc  Test route
// @route GET api/posts@desc Test Route
router.post('/', [auth, [
    check('text', "Text is required").not().isEmpty()
]], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const user = await User.findById(req.user.id).select('-password');
        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        })
        const post = await newPost.save();
        res.json(post);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }

});

// @route  GET api/posts
// @desc   Get all posts
// @access Private

router.get('/', auth, async(req, res) => {
    try {
        // This sort would help to sort by most recent post
        const posts = await Post.find().sort({ date: -1 });
        res.json(posts)
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
});

// @route  GET api/posts/id
// @desc   Get posts by id
// @access Private

router.get('/:id', auth, async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        // To check if there is a post without id or user doesnt exist
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.json(post);
    } catch (err) {
        console.error(err.message);
        // If id passed is not a valid id
        if (err.kind === "ObjectId") {
            return res.status(404).json({ msg: 'Post not found' });
        }
        return res.status(500).send('Server Error');
    }
});

// @route  DELETE api/posts/:id
// @desc   Delete a post
// @access Private

router.delete('/:id', auth, async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        // To check if there is a post without id or user doesnt exist
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        await post.remove();
        res.json({ msg: 'Post successfuly deleted' });
        // To ensure that the user that deletes the post is the actual owner of the post
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({
                msg: "User is not authorized to perform this action"
            });
        }
    } catch (err) {
        console.error(err.message);
        // If id passed is not a valid id
        if (err.kind === "ObjectId") {
            return res.status(404).json({ msg: 'Post not found' });
        }
        return res.status(500).send('Server Error');
    }
});


module.exports = router;