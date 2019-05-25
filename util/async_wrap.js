// middleware to handle exception in async function
module.exports = fn => (...args) => fn(...args).catch(args[2])
