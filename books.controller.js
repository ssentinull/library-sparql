const bookRepo = require('./repo/bookRepo');
const wrap = require('./util/asyncWrap');

exports.books = wrap(async (req, res) => {
  const books = await bookRepo.GetBooks();
  return res.status(200).json(books);
});

module.exports = exports