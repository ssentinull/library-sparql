const bookRepo = require('./repo/book_repo');
const wrap = require('./util/async_wrap');

exports.search = wrap(async (req, res) => {
  const { name } = req.body;

  const books = await bookRepo.getBooks(name);

  const formattedBooks = {
    "books": [],
    "suggestions": [],
  };

  books.results.bindings.forEach(book => {
    var formattedBook = {
      "name": book.name.value,
      "category": book.category.value,
      "author": book.author.value,
      "publisher": book.publisher.value,
      "library": book.library.value
    }

    formattedBooks.books.push(formattedBook);
  });
  
  return res.status(200).json(formattedBooks);
});

module.exports = exports