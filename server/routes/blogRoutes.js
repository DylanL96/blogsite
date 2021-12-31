const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog');

// GET request for all of the posts
router.get('/posts', blogController.getPostContent);

// GET request for specific post
router.get('/posts/:id', blogController.specificPostContent)

// POST request to create a new blog post
router.post('/create', blogController.postContent);

// DELETE request to delete a specific blog post
router.delete('/posts/:id', blogController.deleteSpecificPost);

// PUT request to update a specific blog post
router.put('/posts/:id', blogController.updateSpecificPost);

module.exports = router;