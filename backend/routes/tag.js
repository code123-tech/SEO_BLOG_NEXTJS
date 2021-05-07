const express = require('express');
const { auth } = require('../validators/authValidation/requireAuth');
const { checkTag } = require('../validators/blogValidation/tag');
const { adminAuthentication } = require('../controllers/auth');
const { createTag,getListOfTags,getTagByName,deleteTag} = require('../controllers/tag');
const router = express.Router();
// @route POST api/create-tag (create operation)
// @return: response data of creation of blog tag
// @access private.
router.post("/create-tag",auth,checkTag,adminAuthentication,createTag);
// @route GET api/get-tag (read operation)
// @return: response data containing list of all tags 
// @access public
router.get("/get-tags",getListOfTags);
// @route GET api/tag/:slug (read  a specific tag)
// @return: response data contain tag 
// @access public
router.get("/tag/:slug",getTagByName);
// @route DELETE api/tag/:slug (delete  a specific tag)
// @return: response data 
// @access private 
router.delete("/tag/:slug",auth,adminAuthentication,deleteTag);

module.exports = router;