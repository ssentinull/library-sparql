const express = require('express');
const booksController = require('./books.controller');

const router = express.Router();

router.get('/books', booksController.books);

module.exports = router;