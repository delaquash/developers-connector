const express = require('express');
const router = express.Router();

// @route Get api/Auth
// @desc  Test route
// @route GET api/auth @desc Test Route
router.get('/', (req, res) =>res.send('AUTH Route'));


module.exports = router;

