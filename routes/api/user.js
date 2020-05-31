const express = require('express');
const router = express.Router();

// @route Get api/users
// @desc  Test route
// @route GET api/users@desc Test Route
router.post('/', (req, res) => {
    console.log(req.body);
    res.send('User Route');
    });


module.exports = router;
