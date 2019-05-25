const bookRepo = require('./repo/book_repo');
const wrap = require('./util/async_wrap');

exports.books = wrap(async (req, res) => {
  const books = await bookRepo.GetBooks();
  return res.status(200).json(books);
});

module.exports = exports