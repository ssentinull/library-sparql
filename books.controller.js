const bookFormatter = require('./util/book_formatter');
const bookRepo = require('./repo/book_repo');
const wrap = require('./util/async_wrap');

exports.search = wrap(async (req, res) => {
  const [{ name }, results, unfilteredCategories] = [
    req.body,
    {
      "books": [],
      "suggestions": [],
    },
    []
  ];
  
  if(name){
    const books = await bookRepo.getBooks(name); 

    books.results.bindings.forEach(book => {
      const formattedBook = bookFormatter(book);
  
      results.books.push(formattedBook);
    });
  
    results.books.forEach(book => {
      unfilteredCategories.push(book.category);
    });
  }

  const filterredCategories = unfilteredCategories.filter((item, position) => {
    return unfilteredCategories.indexOf(item) == position;
  });

  const suggestions = await bookRepo.getSuggestions(filterredCategories);
  
  suggestions.forEach(suggestion => {
    const suggestedBooks = suggestion.results.bindings;

    suggestedBooks.forEach(suggestedBook => {
      const formattedBook = bookFormatter(suggestedBook);
      
      results.suggestions.push(formattedBook);
    });
  });

  return res.status(200).json(results);
});

module.exports = exports