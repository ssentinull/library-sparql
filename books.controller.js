const bookFormatter = require('./util/book_formatter');
const bookRepo = require('./repo/book_repo');
const wrap = require('./util/async_wrap');

exports.search = wrap(async (req, res) => {

  // multiple variables creation
  const [{ name }, results, unfilteredCategories] = [
    req.body,
    {
      "books": [],
      "suggestions": [],
    },
    []
  ];
  
  // if the 'name' input is not an empty string
  if(name){

    // get the books from Jena Fuseki DB
    const books = await bookRepo.getBooks(name); 

    // format the books and add them to the 'books' key value in 'results' variable
    books.results.bindings.forEach(book => {
      const formattedBook = bookFormatter(book);
  
      results.books.push(formattedBook);
    });
  
    // get all the books categories and push them to an array
    results.books.forEach(book => unfilteredCategories.push(book.category));
  }

  // filter duplicate categories in the categories array
  const filterredCategories = unfilteredCategories.filter((item, position) => 
    unfilteredCategories.indexOf(item) == position
  );

  // get the suggested books based on the categories in the categories array
  const suggestions = await bookRepo.getSuggestions(filterredCategories);
  
  // format the suggested books and add them to the 'suggestions' key value in 'results' variable
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