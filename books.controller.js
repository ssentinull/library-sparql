const bookRepo = require('./repo/book_repo');
const wrap = require('./util/async_wrap');

exports.search = wrap(async (req, res) => {
  const { name } = req.body;

  const books = await bookRepo.getBooks(name);
  
  return res.status(200).json(books);
});

module.exports = exports