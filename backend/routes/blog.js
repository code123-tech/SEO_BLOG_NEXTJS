const express = require('express');
const { adminAuthentication } = require('../controllers/auth');
const { createBlog,BlogList,listOfBlogsWithCAndT,getBlogPhoto, ReadSingleBlog, RelatedBlogs} = require('../controllers/blog');
const { auth } = require('../validators/authValidation/requireAuth');
const router = express.Router();

// @route POST api/create-blog (create operation)
// @return: response data of creation of blog
// @access private.
router.post("/create-blog",auth,adminAuthentication,createBlog);
// @route GET api/blogs (get operation)
// @return: response list of blogs
// @access public.
router.get("/blogs",BlogList);
// @route POST api/blogs-With-C-And-T (get operation)
// @return: response list of blogs with given categories and tags
// @access public.
router.post("/blogs-With-C-And-T",listOfBlogsWithCAndT);
// @route GET api/blog/photo/:slug (get operation)
// @return: response blog photo
// @access public.
router.get("/blog/photo/:slug",getBlogPhoto);
// @route GET api/blog/:slug (get operation)
// @return: response blog data
// @access public.
router.get("/blog/:slug",ReadSingleBlog);
// @route POST /blogs/related/ (POST operation)
// @return: response blog data
// @access public.
// router.post("/blogs/related/",RelatedBlogs);

module.exports = router;
