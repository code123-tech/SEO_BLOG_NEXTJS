const express = require('express');
const router = express.Router();
const authValidation  = require("../validators/authValidation/authValidation");
const { signup,signin,signout}  = require("../controllers/auth");

// @route POST api/signup
// send user data For signup
// @access public
router.post("/signup",authValidation.validateNewUser,signup);

// @route POST api/signin
// send user data For signin
// @access public
router.post("/signin",authValidation.validatelogninUser,signin);

// @route POST api/signout
// clear cookies for user signout.
// @access public
router.get('/signout', signout);



module.exports = router;
