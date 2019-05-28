const bookRepo = require('./repo/book_repo');
const wrap = require('./util/async_wrap');

exports.search = wrap(async (req, res) => {
  const { name } = req.body;

  const [books, results, unfilteredCategories] = [
    await bookRepo.getBooks(name), 
    {
      "books": [],
      "suggestions": [],
    },
    []
  ];

  books.results.bindings.forEach(book => {
    const formattedBook = {
      "name": book.name.value,
      "category": book.category.value,
      "author": book.author.value,
      "publisher": book.publisher.value,
      "library": book.library.value
    }

    results.books.push(formattedBook);
  });

  results.books.forEach(book => {
    unfilteredCategories.push(book.category);
  });

  const filterredCategories = unfilteredCategories.filter((item, position) => {
    return unfilteredCategories.indexOf(item) == position;
  });

  const suggestions = await bookRepo.getSuggestions(filterredCategories);
  
  suggestions.forEach(suggestion => {
    const suggestedBooks = suggestion.results.bindings;

    suggestedBooks.forEach(suggestedBook => {
      const formattedBook = {
        "name": suggestedBook.name.value,
        "category": suggestedBook.category.value,
        "author": suggestedBook.author.value,
        "publisher": suggestedBook.publisher.value,
        "library": suggestedBook.library.value
      }
      
      results.suggestions.push(formattedBook);
    });
  });

  return res.status(200).json(results);
});

module.exports = exports