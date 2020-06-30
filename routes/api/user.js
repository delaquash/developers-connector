const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// Bringing the model where i pulled the body parameters (name, password, email) from
const User = require('../../model/User');
const config = require('config');

// @route Get api/users
// @desc  Test route
// @route GET api/users@desc Test Route
router.post(
    '/', [
        // TO ensure username is an email and password is minimum 6 characters
        check('name', 'Name is required').not().isEmpty(),
        // Ensuring email is valid
        check('email', 'Please include a valid email').isEmail(),
        // Check if password is 6 characters or more
        check(
            'password',
            'Please enter a password with 6 or more character'
        ).isLength({
            min: 6,
        }),
    ],
    async(req, res) => {
        //  Validate error
        const errors = validationResult(req);
        // Responses for error is email and password(not a valid mail and password)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            });
        }

        const { name, email, password } = req.body;

        try {
            // To check if user exist and check for multiple email per user
            let user = await User.findOne({
                email
            });
            if (user) {
                return res.status(400).json({
                    errors: [{
                        msg: 'User already exists',
                    }, ],
                });
            }
            // get users avatar
            const avatar = gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            })
            user = new User({
                name,
                email,
                avatar,
                password
            });

            // Encrypt password for security or hash it
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            // Save user to DB
            await user.save();

            // return jsonwebtokens
            const payload = {
                user: {
                    id: user.id,
                },
            };
            jwt.sign(
                payload,
                config.get('jwtSecret'), {
                    expiresIn: 360000,
                },
                (err, token) => {
                    if (err) throw err;
                    res.json({
                        token,
                    });
                }
            );
            // res.send('User registered');
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

module.exports = router;