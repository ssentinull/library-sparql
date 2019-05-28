module.exports = fn = data => {
  return {
    "name": data.name.value,
    "category": data.category.value,
    "author": data.author.value,
    "publisher": data.publisher.value,
    "library": data.library.value
  }
}