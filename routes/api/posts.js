const express = require('express');
const router = express.Router();

// @route Get api/post
// @desc  Test route
// @route GET api/posts@desc Test Route
router.get('/', (req, res) =>res.send(' Post Route'));

module.exports = router;
