const express = require('express');
const { auth } = require('../validators/authValidation/requireAuth');
const { checkBlogCategory } = require('../validators/blogValidation/blogCategory');
const { adminAuthentication } = require('../controllers/auth');
const { createCategory,getListOfBlogCategories,getBlogCategory,deleteBlogCategory} = require('../controllers/blogCategory');
const router = express.Router();
// @route POST api/create-category (create operation)
// @return: response data of creation of blog category
// @access private.
router.post("/create-category",auth,checkBlogCategory,adminAuthentication,createCategory);
// @route GET api/get-categories (read operation)
// @return: response data containing list of all categories 
// @access public
router.get("/get-categories",getListOfBlogCategories);
// @route GET api/category/:slug (read  a specific category)
// @return: response data contain category 
// @access public
router.get("/category/:slug",getBlogCategory);
// @route DELETE api/category/:slug (read  a specific category)
// @return: response data contain category 
// @access private 
router.delete("/category/:slug",auth,adminAuthentication,deleteBlogCategory);

module.exports = router;