const express = require('express');
const booksController = require('./books.controller');

const router = express.Router();

router.post('/search', booksController.search);

module.exports = router;