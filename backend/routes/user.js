const express = require('express');
const { userAuth, recoverPassword,updateUserPassword} = require('../controllers/auth');
const { auth } = require('../validators/authValidation/requireAuth');
const router = express.Router();

// @route GET api/user/profile
// send user data For signup
// @access private
router.get("/user/profile/:username",auth,userAuth);
// @route POST api/user/
// @access public
router.post("/recover/password",recoverPassword);
// @route PATCH api/update/password
// @access public
router.patch("/update/password",updateUserPassword);

module.exports = router;