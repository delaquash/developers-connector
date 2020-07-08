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
router.get('/', [auth, [
    check('text', "Test is required").not().isEmpty()
]], async(req, res) => {
    const errors = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const user = await User.findById(req.user.id).select('-password');
        const newPost = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        }
        const post = await newPost.save();
        res.json(post);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }

});

module.exports = router;