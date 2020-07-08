const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../model/Profile');
const User = require('../../model/User');
const request = require("request");
const { check, validationResult } = require('express-validator');
const config = require("config");
const axios = require('axios');

// @route Get endpoint{api/profile/me}
// @desc  get current user profile
// @access private
router.get('/me', auth, async(req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);
        if (!profile) {
            return res.status(400).json({ msg: "There is no profile for this user" });

        }
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Sever Error');
    }
});


// @route POST api/profie
// @desc Create or update user profile
// @access Privatee
router.post('/', [auth, [
    // To ensure status and skill are not left unfilled in front-end
    check('status', 'Status is required').not().isEmpty(),
    check("skills", "Skills is reqired").not().isEmpty()
]], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { company, website, location, bio, status, githubusername, skills, youtube, instagram, facebook, twitter, linkedin } = req.body;

    const profileFields = {};
    profileFields.user = req.user.id;

    // Build profile object
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
        profileFields.skills = skills.split(',').map(skill => skill.trim())
    }
    // Build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;
    try {
        let profile = await Profile.findOne({ user: req.user.id });
        if (profile) {
            // we are going to update
            profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true });
            return res.json(profile);
        }
        // IF not found, then we can create
        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile);

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');

    }

});

// @route GET api/profie
// @desc Get all profile
// @access Public

router.get('/', async(req, res) => {
    try {
        const profiles = await Profile.find().populate("user", ["names", "avatar"]);
        res.json(profiles);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error")
    }
})

// @route GET api/profile/user/:user_id
// @desc  get profile by user ID
// @access Public
router.get('/user/:user_id', async(req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate("user", ["names", "avatar"]);
        if (!profile) {
            return res.status(400).json({ msg: "Profile does not exist" });
        }
        res.json(profile);
    } catch (err) {
        console.log(err.message);

        // This bring an error message for profile that doesnt exist
        if (err.kind === "ObjectId") {
            return res.status(400).json({ msg: "Profile does not exist" });
        }
        res.status(500).send("Serve Error");
    }
});


// @route DELETE api/profile
// @desc  DELETE profile by user and post
// @access Private
router.delete('/', auth, async(req, res) => {
    try {
        // Remove user profile
        await Profile.findOneAndRemove({ user: req.user.id });
        // Remove user
        await User.findOneAndRemove({ _id: req.user.id });

        res.json({ msg: "User deleted" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});


// @route  PUT api/profile/experience
// @desc  Add profile experience
// @access  Private
router.put('/experience', [auth, [
    // To check that all this details is required
    check('title', "Title is required").not().isEmpty(),
    check("company", "Company is required").not().isEmpty(),
    check("from", "From date is required").not().isEmpty()
]], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { title, company, location, from, to, current, description } = req.body;
    const newExp = { title, company, location, from, to, current, description }
    try {
        // Find a profile to update
        const profile = await Profile.findOne({
            user: req.user.id
        });
        // To enable update of experience from most recent experience
        profile.experience.unshift(newExp);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route   Delete api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private

router.delete('/experience/:exp_id', auth, async(req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        // get the removed index to get the matched exp_id
        const removeIndex = profile.experience
            .map(item => item.id)
            .indexOf(req.params.exp_id);
        profile.experience.splice(removeIndex, 1);
        // Saving the result
        await profile.save();
        // Pushing the response to json format
        res.json(profile);
    } catch (err) {
        console.error(err.mesage);
        res.status(500).send("Server Error");
    }
});

// @route  PUT api/profile/education
// @desc  Add profile education
// @access  Private
router.put('/education', [auth, [
    // To check that all this details is required
    check('school', "School is required").not().isEmpty(),
    check("degree", "Degree is required").not().isEmpty(),
    check("fieldofstudy", "Field of Study  is  required").not().isEmpty(),
    check("from", "From date is required").not().isEmpty()
]], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { school, degree, fieldofstudy, from, to, current, description } = req.body;
    const newEdu = { school, degree, fieldofstudy, from, to, current, description }
    try {
        // Find a profile to update
        const profile = await Profile.findOne({
            user: req.user.id
        });
        // To enable update of education from most recent education
        profile.education.unshift(newEdu);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route   Delete api/profile/education/:exp_id
// @desc    Delete education from profile
// @access  Private

router.delete('/education/:edu_id', auth, async(req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        // get the removed index to get the matched edu_id
        const removeIndex = profile.education
            .map(item => item.id)
            .indexOf(req.params.edu_id);
        profile.education.splice(removeIndex, 1);
        // Saving the result
        await profile.save();
        // Pushing the response to json format
        res.json(profile);
    } catch (err) {
        console.error(err.mesage);
        res.status(500).send("Server Error");
    }

    // @route  GET api/profile/github/:username
    // @desc   Get user repos from github
    // @access Public
    router.get('/github/:username', async(req, res) => {
        try {
            const uri = encodeURI(
                `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
            );
            const headers = {
                'user-agent': 'node.js',
                Authorization: `token ${config.get('githubSecret')}`
            };
            const gitHubResponse = await axios.get(uri, { headers });
            return res.json(gitHubResponse.data);
        } catch (err) {
            console.error(err.message);
            return res.status(404).json({ msg: 'No Github profile found for this user' });
        }
    })
});

module.exports = router;