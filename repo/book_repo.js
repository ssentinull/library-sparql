const axios = require('axios');
const qs = require('qs');

const BASE_URL='http://fuseki:3030';

const headers = {
  'Accept': 'application/sparql-results+json,*/*;q=0.9',
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
}

exports.getBooks = async name => {
  const queryData = {
    query: 
    `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX t: <http://www.semanticweb.org/boi/ontologies/2019/4/untitled-ontology-3#>
    
    SELECT ?books
    WHERE {
      ?books rdf:type t:Book;
              t:name ?name.
      filter regex(?name, "^${name}").
    }`
  };

  try{
    const { data } = await axios(`${BASE_URL}/perpustakaan/query`, {
      method: 'POST',
      headers,
      data: qs.stringify(queryData)
    });

    return Promise.resolve(data);
  }
  catch(err){
    console.error(err);
    return Promise.reject(err);
  }
}

module.exports = exports;