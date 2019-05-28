const bookRepo = require('./repo/book_repo');
const wrap = require('./util/async_wrap');

exports.search = wrap(async (req, res) => {
  const { name } = req.body;

  const books = await bookRepo.getBooks(name);

  const results = {
    "books": [],
    "suggestions": [],
  };

  books.results.bindings.forEach(book => {
    var book = {
      "name": book.name.value,
      "category": book.category.value,
      "author": book.author.value,
      "publisher": book.publisher.value,
      "library": book.library.value
    }

    results.books.push(book);
  });

  const unfilteredCategories = [];

  results.books.forEach(book => {
    unfilteredCategories.push(book.category);
  });

  const filterredCategories = unfilteredCategories.filter((item, position) => {
    return unfilteredCategories.indexOf(item) == position;
  });

  const suggestions = await bookRepo.getSuggestions(filterredCategories);
  
  suggestions.forEach(suggestion => {
    console.log('suggestion')
    console.log(suggestion)
    
    const booksByCategory = suggestion.results.bindings;

    booksByCategory.forEach(bookByCategory => {
      const book = {
        "name": bookByCategory.name.value,
        "category": bookByCategory.category.value,
        "author": bookByCategory.author.value,
        "publisher": bookByCategory.publisher.value,
        "library": bookByCategory.library.value
      }
      results.suggestions.push(book);
    });
  });

  return res.status(200).json(results);
});

module.exports = exports