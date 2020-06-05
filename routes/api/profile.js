const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../model/Profile');
const User = require('../../model/User');

// @route Get api/profile/me
// @desc  get current user profile
// @route GET api/profile@desc Test Route
router.get('/me', auth, async (req, res) => {
    try {
        const  profile = await Profile.findOne({ user: req.user.id}).populate('user', ['name', 'avatar']);
        if(!profile) {
            return res.status(400).json({ msg: "There is no profile for this user"});

        }
    res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Sever Error');
    }
});


module.exports = router;
