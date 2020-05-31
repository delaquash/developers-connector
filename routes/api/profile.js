const express = require('express');
const router = express.Router();

// @route Get api/profile
// @desc  Test route
// @route GET api/profile@desc Test Route
router.get('/', (req, res) =>res.send('Profile Route'));


module.exports =router;
