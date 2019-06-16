const express = require('express');
const booksController = require('./books.controller');

// create new express router
const router = express.Router();

// map '/search' endpoint to method 'search' in 'booksController' controller
router.post('/search', booksController.search);

module.exports = router;